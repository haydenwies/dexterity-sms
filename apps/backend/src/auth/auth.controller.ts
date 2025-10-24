import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"

import {
	type ForgotPasswordDto,
	forgotPasswordDtoSchema,
	type ResetPasswordDto,
	resetPasswordDtoSchema,
	type SessionDto,
	type SignInDto,
	signInDtoSchema,
	type SignUpDto,
	signUpDtoSchema,
	type UserDto
} from "@dexterity-sms/core/auth"

import { Session, User } from "~/auth/auth.decorator"
import { AuthGuard } from "~/auth/auth.guard"
import { AuthService } from "~/auth/auth.service"
import { type Session as SessionEntity } from "~/auth/session/session.entity"
import { toSessionDto } from "~/auth/session/session.utils"
import { User as UserEntity } from "~/auth/user/user.entity"
import { toUserDto } from "~/auth/user/user.utils"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"

@Controller("auth")
class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard)
	@Get("session")
	async getSession(@Session() session: SessionEntity): Promise<SessionDto> {
		return toSessionDto(session)
	}

	@UseGuards(AuthGuard)
	@Get("user")
	async getUser(@User() user: UserEntity): Promise<UserDto> {
		return toUserDto(user)
	}

	@Post("sign-up")
	async signUp(@Body(new ZodValidationPipe(signUpDtoSchema)) body: SignUpDto): Promise<string> {
		const sessionId = await this.authService.signUp(body)

		return sessionId
	}

	@Post("sign-in")
	async signIn(@Body(new ZodValidationPipe(signInDtoSchema)) body: SignInDto): Promise<string> {
		const sessionId = await this.authService.signIn(body)

		return sessionId
	}

	@UseGuards(AuthGuard)
	@Post("sign-out")
	async signOut(@Session() session: SessionEntity): Promise<void> {
		await this.authService.signOut(session.id)
	}

	@Post("forgot-password")
	async forgotPassword(@Body(new ZodValidationPipe(forgotPasswordDtoSchema)) body: ForgotPasswordDto): Promise<void> {
		await this.authService.forgotPassword(body)
	}

	@Post("reset-password")
	async resetPassword(@Body(new ZodValidationPipe(resetPasswordDtoSchema)) body: ResetPasswordDto): Promise<void> {
		await this.authService.resetPassword(body)
	}
}

export { AuthController }
