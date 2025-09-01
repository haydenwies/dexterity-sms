import { Injectable } from "@nestjs/common"

import { Session } from "~/auth/session/session.entity"
import { SessionRepository } from "~/auth/session/session.repository"

@Injectable()
class SessionService {
	constructor(private readonly sessionRepository: SessionRepository) {}

	async find(id: string): Promise<Session | undefined> {
		const session = await this.sessionRepository.find(id)
		if (!session) return undefined

		if (session.expiresAt < new Date()) {
			await this.delete(session)
			return undefined
		}

		return session
	}

	async delete(session: Session): Promise<void> {
		return
	}

	async deleteAllByUserId(userId: string): Promise<void> {
		return
	}
}

export { SessionService }
