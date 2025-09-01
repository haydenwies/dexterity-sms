import { Injectable } from "@nestjs/common"

import { Session } from "~/auth/session/session.entity"

@Injectable()
class SessionRepository {
	async find(id: string): Promise<Session | undefined> {
		return undefined
	}
}

export { SessionRepository }
