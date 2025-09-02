import { Injectable } from "@nestjs/common"

import { Session } from "~/auth/session/session.entity"

@Injectable()
class SessionRepository {
	async find(id: string): Promise<Session | undefined> {
		return undefined
	}

	async create(session: Session): Promise<Session> {
		return session
	}
}

export { SessionRepository }
