import { Injectable } from "@nestjs/common"

import { Session } from "./session/session.entity"
import { SessionService } from "./session/session.service"

@Injectable()
class AuthService {
	constructor(private readonly sessionService: SessionService) {}

	async getSession(id: string): Promise<Session | undefined> {
		return this.sessionService.find(id)
	}

	async signIn(): Promise<void> {
		return
	}

	async signUp(): Promise<void> {
		return
	}

	async signOut(): Promise<void> {
		return
	}
}

export { AuthService }
