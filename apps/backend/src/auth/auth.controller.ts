import { Body, Controller, Post, UseGuards } from "@nestjs/common"

import {
	type ForgotPasswordDto,
	forgotPasswordDtoSchema,
	type ResetPasswordDto,
	resetPasswordDtoSchema,
	type SignInDto,
	signInDtoSchema,
	type SignUpDto,
	signUpDtoSchema
} from "@repo/types/auth/dto"

import { Session } from "~/auth/auth.decorator"
import { AuthGuard } from "~/auth/auth.guard"
import { AuthService } from "~/auth/auth.service"
import { type Session as SessionEntity } from "~/auth/session/session.entity"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"

@Controller("auth")
class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	signUp(@Body(new ZodValidationPipe(signUpDtoSchema)) body: SignUpDto): Promise<string> {
		return this.authService.signUp(body)
	}

	@Post("sign-in")
	signIn(@Body(new ZodValidationPipe(signInDtoSchema)) body: SignInDto): Promise<string> {
		return this.authService.signIn(body)
	}

	@UseGuards(AuthGuard)
	@Post("sign-out")
	signOut(@Session() session: SessionEntity): Promise<void> {
		return this.authService.signOut(session.id)
	}

	@Post("forgot-password")
	forgotPassword(@Body(new ZodValidationPipe(forgotPasswordDtoSchema)) body: ForgotPasswordDto): Promise<void> {
		return this.authService.forgotPassword(body)
	}

	@Post("reset-password")
	resetPassword(@Body(new ZodValidationPipe(resetPasswordDtoSchema)) body: ResetPasswordDto): Promise<void> {
		return this.authService.resetPassword(body)
	}
}

export { AuthController }
