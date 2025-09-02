import { Injectable, NotFoundException } from "@nestjs/common"

import { type SessionDto } from "@repo/types/auth"

import { Session, SessionCreateParams } from "~/auth/session/session.entity"
import { SessionRepository } from "~/auth/session/session.repository"

@Injectable()
class SessionService {
	constructor(private readonly sessionRepository: SessionRepository) {}

	async find(id: string): Promise<Session | undefined> {
		const session = await this.sessionRepository.find(id)
		if (!session) return undefined

		if (session.isExpired()) {
			await this.delete(session)
			return undefined
		}

		return session
	}

	async get(id: string): Promise<Session> {
		const session = await this.find(id)
		if (!session) throw new NotFoundException("Session not found")

		return session
	}

	async create(params: SessionCreateParams): Promise<Session> {
		const session = Session.create(params)
		const createdSession = await this.sessionRepository.create(session)

		return createdSession
	}

	async delete(
		session: Session,
		config: { allMatchingUserId?: boolean; allMatchingOrganizationId?: boolean } = {}
	): Promise<void> {
		return
	}

	toDto(session: Session): SessionDto {
		return {
			id: session.id,
			userId: session.userId,
			organizationId: session.organizationId,
			createdAt: session.createdAt,
			updatedAt: session.updatedAt
		}
	}
}

export { SessionService }
