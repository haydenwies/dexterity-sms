import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { routes } from "@repo/routes"
import {
	AccountProvider,
	type ForgotPasswordDto,
	type ResetPasswordDto,
	type SignInDto,
	type SignUpDto
} from "@repo/types/auth"

import { SessionService } from "~/auth/session/session.service"
import { UserService } from "~/auth/user/user.service"
import { VerificationTokenService } from "~/auth/verification-token/verification-token.service"
import { EmailService } from "~/email/email.service"
import { AccountService } from "./account/account.service"

@Injectable()
class AuthService {
	constructor(
		private readonly configService: ConfigService,
		private readonly accountService: AccountService,
		private readonly sessionService: SessionService,
		private readonly userService: UserService,
		private readonly verificationTokenService: VerificationTokenService,
		private readonly emailService: EmailService
	) {}

	async signUp(dto: SignUpDto): Promise<string> {
		// Check for existing user
		const user = await this.userService.findByEmail(dto.email)
		if (user) throw new ConflictException("A user with this email already exists")

		// Create user
		const createdUser = await this.userService.create({
			firstName: dto.firstName,
			lastName: dto.lastName,
			email: dto.email
		})

		// Create account
		await this.accountService.create({
			userId: createdUser.id,
			provider: AccountProvider.CREDENTIALS,
			providerAccountId: createdUser.id,
			password: dto.password
		})

		// Create session
		const createdSession = await this.sessionService.create({
			userId: createdUser.id
		})

		return createdSession.id
	}

	async signIn(dto: SignInDto): Promise<string> {
		const user = await this.userService.findByEmail(dto.email)
		if (!user) throw new UnauthorizedException("Invalid email or password")

		const account = await this.accountService.findByUserIdAndProvider(user.id, AccountProvider.CREDENTIALS)
		if (!account) throw new UnauthorizedException("Invalid email or password")

		const isVerified = await account.verifyPassword(dto.password)
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
			value: user.id
		})

		// TODO: Better config service and router
		const url =
			this.configService.getOrThrow<string>("router.webPublicUrl") +
			routes.web.RESET_PASSWORD({
				searchParams: { token: verificationToken.id }
			})

		await this.emailService.sendResetPassword(user.email, { url })
	}

	async resetPassword(dto: ResetPasswordDto): Promise<void> {
		const verificationToken = await this.verificationTokenService.get(dto.token)
		if (verificationToken.type !== "forgot-password") {
			await this.verificationTokenService.delete(verificationToken)
			throw new BadRequestException("Verification failed")
		}

		await this.accountService.updatePassword(verificationToken.value, dto.password)
	}
}

export { AuthService }
