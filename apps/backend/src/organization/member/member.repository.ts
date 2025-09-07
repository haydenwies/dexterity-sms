import { Inject, Injectable } from "@nestjs/common"
import { and, eq } from "drizzle-orm"

import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { memberTable } from "~/database/database.schema"
import { Member } from "~/organization/member/member.entity"

@Injectable()
class MemberRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(userId: string, organizationId: string): Promise<Member | undefined> {
		const [row] = await this.db
			.select()
			.from(memberTable)
			.where(and(eq(memberTable.userId, userId), eq(memberTable.organizationId, organizationId)))
			.limit(1)
		if (!row) return undefined

		return new Member({
			userId: row.userId,
			organizationId: row.organizationId,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async findAllByUserId(userId: string): Promise<Member[]> {
		const rows = await this.db.select().from(memberTable).where(eq(memberTable.userId, userId))

		return rows.map(
			(row) =>
				new Member({
					userId: row.userId,
					organizationId: row.organizationId,
					createdAt: row.createdAt,
					updatedAt: row.updatedAt
				})
		)
	}

	async create(member: Member): Promise<Member> {
		const [row] = await this.db
			.insert(memberTable)
			.values({
				userId: member.userId,
				organizationId: member.organizationId,
				createdAt: member.createdAt,
				updatedAt: member.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create member")

		return new Member({
			userId: row.userId,
			organizationId: row.organizationId,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { MemberRepository }
