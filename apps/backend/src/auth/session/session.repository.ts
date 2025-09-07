import { Inject, Injectable } from "@nestjs/common"
import { eq, inArray } from "drizzle-orm"

import { Session } from "~/auth/session/session.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { sessionTable } from "~/database/database.schema"

@Injectable()
class SessionRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(id: string): Promise<Session | undefined> {
		const [row] = await this.db.select().from(sessionTable).where(eq(sessionTable.id, id)).limit(1)
		if (!row) return undefined

		return new Session({
			id: row.id,
			userId: row.userId,
			expiresAt: row.expiresAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async findAllByUserId(userId: string): Promise<Session[]> {
		const rows = await this.db.select().from(sessionTable).where(eq(sessionTable.userId, userId))

		return rows.map(
			(row) =>
				new Session({
					id: row.id,
					userId: row.userId,
					expiresAt: row.expiresAt,
					createdAt: row.createdAt,
					updatedAt: row.updatedAt
				})
		)
	}

	async create(session: Session): Promise<Session> {
		const [row] = await this.db
			.insert(sessionTable)
			.values({
				id: session.id,
				userId: session.userId,
				expiresAt: session.expiresAt,
				createdAt: session.createdAt,
				updatedAt: session.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create session")

		return new Session({
			id: row.id,
			userId: row.userId,
			expiresAt: row.expiresAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async deleteMany(sessions: Session[]): Promise<void> {
		if (sessions.length === 0) return

		const sessionIds = sessions.map((session) => session.id)
		await this.db.delete(sessionTable).where(inArray(sessionTable.id, sessionIds))
	}
}

export { SessionRepository }
