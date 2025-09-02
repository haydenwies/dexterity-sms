import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"

import { type SessionDto } from "@repo/types/auth"
import { ForgotPasswordDto } from "@repo/types/auth/dto/forgot-password"
import { ResetPasswordDto } from "@repo/types/auth/dto/reset-password"
import { type SignInDto } from "@repo/types/auth/dto/sign-in"
import { type SignUpDto } from "@repo/types/auth/dto/sign-up"

import { SessionService } from "~/auth/session/session.service"
import { UserService } from "~/auth/user/user.service"
import { VerificationTokenService } from "~/auth/verification-token/verification-token.service"
import { EmailService } from "~/email/email.service"

@Injectable()
class AuthService {
	constructor(
		private readonly sessionService: SessionService,
		private readonly userService: UserService,
		private readonly verificationTokenService: VerificationTokenService,
		private readonly emailService: EmailService
	) {}

	async getSession(sessionId: string): Promise<SessionDto> {
		const session = await this.sessionService.get(sessionId)
		return this.sessionService.toDto(session)
	}

	async signUp(dto: SignUpDto): Promise<string> {
		const user = await this.userService.findByEmail(dto.email)
		if (user) throw new ConflictException("A user with this email already exists")

		const createdUser = await this.userService.create({
			email: dto.email,
			password: dto.password
		})

		const createdSession = await this.sessionService.create({
			userId: createdUser.id
		})

		return createdSession.id
	}

	async signIn(dto: SignInDto): Promise<string> {
		const user = await this.userService.findByEmail(dto.email)
		if (!user) throw new UnauthorizedException("Invalid email or password")

		const isVerified = await user.verifyPassword(dto.password)
		if (!isVerified) throw new UnauthorizedException("Invalid email or password")

		const createdSession = await this.sessionService.create({
			userId: user.id
		})

		return createdSession.id
	}

	async signOut(sessionId: string): Promise<void> {
		const session = await this.sessionService.find(sessionId)
		if (!session) return

		await this.sessionService.delete(session)
	}

	async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
		const user = await this.userService.getByEmail(dto.email)

		const verificationToken = await this.verificationTokenService.create({
			type: "forgot-password",
			value: user.id,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60)
		})

		// TODO Send email with verification token id
		await this.emailService.send()
	}

	async resetPassword(dto: ResetPasswordDto): Promise<void> {
		const verificationToken = await this.verificationTokenService.get(dto.token)
		if (verificationToken.type !== "forgot-password") {
			await this.verificationTokenService.delete(verificationToken)
			throw new BadRequestException("Invalid or missing verification token")
		}

		await this.userService.updatePassword(verificationToken.value, dto.password)
	}
}

export { AuthService }
