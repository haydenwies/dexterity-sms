import { Controller, Get, Post } from "@nestjs/common"

import { AuthService } from "~/auth/auth.service"
import { Session } from "~/auth/session/session.entity"

@Controller("auth")
class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("session")
	getSession(): Promise<Session | undefined> {
		return this.authService.getSession("123")
	}

	@Post("sign-in")
	signIn(): Promise<void> {
		return this.authService.signIn()
	}

	@Post("sign-up")
	signUp(): Promise<void> {
		return this.authService.signUp()
	}

	@Post("sign-out")
	signOut(): Promise<void> {
		return this.authService.signOut()
	}
}

export { AuthController }
