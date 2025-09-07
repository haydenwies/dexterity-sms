import { Inject, Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"

import { VerificationToken } from "~/auth/verification-token/verification-token.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { verificationTokenTable } from "~/database/database.schema"

@Injectable()
class VerificationTokenRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(id: string): Promise<VerificationToken | undefined> {
		const [row] = await this.db
			.select()
			.from(verificationTokenTable)
			.where(eq(verificationTokenTable.id, id))
			.limit(1)
		if (!row) return undefined

		return new VerificationToken({
			id: row.id,
			type: row.type,
			value: row.value,
			expiresAt: row.expiresAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async create(verificationToken: VerificationToken): Promise<VerificationToken> {
		const [row] = await this.db
			.insert(verificationTokenTable)
			.values({
				id: verificationToken.id,
				type: verificationToken.type,
				value: verificationToken.value,
				expiresAt: verificationToken.expiresAt,
				createdAt: verificationToken.createdAt,
				updatedAt: verificationToken.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create verification token")

		return new VerificationToken({
			id: row.id,
			type: row.type,
			value: row.value,
			expiresAt: row.expiresAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async delete(verificationToken: VerificationToken): Promise<VerificationToken> {
		const [row] = await this.db
			.delete(verificationTokenTable)
			.where(eq(verificationTokenTable.id, verificationToken.id))
			.returning()
		if (!row) throw new Error("Failed to delete verification token")

		return new VerificationToken({
			id: row.id,
			type: row.type,
			value: row.value,
			expiresAt: row.expiresAt,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { VerificationTokenRepository }
