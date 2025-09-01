import { Injectable } from "@nestjs/common"

@Injectable()
class AuthService {
	async getSession(): Promise<void> {
		return
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
