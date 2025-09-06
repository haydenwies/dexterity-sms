import { Injectable } from "@nestjs/common"

import { Session } from "~/auth/session/session.entity"

@Injectable()
class SessionRepository {
	async find(id: string): Promise<Session | undefined> {
		return undefined
	}

	async findAllByUserId(userId: string): Promise<Session[]> {
		return []
	}

	async create(session: Session): Promise<Session> {
		return session
	}

	async deleteMany(sessions: Session[]): Promise<void> {
		return
	}
}

export { SessionRepository }
