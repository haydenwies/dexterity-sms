import { Inject, Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"

import { User } from "~/auth/user/user.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { userTable } from "~/database/database.schema"

@Injectable()
class UserRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(id: string): Promise<User | undefined> {
		const [row] = await this.db.select().from(userTable).where(eq(userTable.id, id)).limit(1)
		if (!row) return undefined

		return new User({
			id: row.id,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async findByEmail(email: string): Promise<User | undefined> {
		const [row] = await this.db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
		if (!row) return undefined

		return new User({
			id: row.id,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async create(user: User): Promise<User> {
		const [row] = await this.db
			.insert(userTable)
			.values({
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create user")

		return new User({
			id: row.id,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}

	async update(user: User): Promise<User> {
		const [row] = await this.db
			.update(userTable)
			.set({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				updatedAt: new Date()
			})
			.where(eq(userTable.id, user.id))
			.returning()
		if (!row) throw new Error("Failed to update user")

		return new User({
			id: row.id,
			firstName: row.firstName,
			lastName: row.lastName,
			email: row.email,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { UserRepository }
