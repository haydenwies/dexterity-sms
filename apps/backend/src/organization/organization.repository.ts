import { Inject, Injectable } from "@nestjs/common"
import { eq, inArray } from "drizzle-orm"

import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { organizationTable } from "~/database/database.schema"
import { Organization } from "~/organization/organization.entity"

@Injectable()
class OrganizationRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(id: string): Promise<Organization | undefined> {
		const [row] = await this.db.select().from(organizationTable).where(eq(organizationTable.id, id)).limit(1)
		if (!row) return undefined

		return OrganizationRepository.toEntity(row)
	}

	async findByExternalBillingAccountId(externalBillingAccountId: string): Promise<Organization | undefined> {
		const [row] = await this.db
			.select()
			.from(organizationTable)
			.where(eq(organizationTable.externalBillingAccountId, externalBillingAccountId))
			.limit(1)
		if (!row) return undefined

		return OrganizationRepository.toEntity(row)
	}

	async findAll(ids: string[]): Promise<Organization[]> {
		if (ids.length === 0) return []

		const rows = await this.db.select().from(organizationTable).where(inArray(organizationTable.id, ids))

		return rows.map((row) => OrganizationRepository.toEntity(row))
	}

	async create(organization: Organization): Promise<Organization> {
		const [row] = await this.db
			.insert(organizationTable)
			.values({
				id: organization.id,
				name: organization.name,
				email: organization.email,
				createdAt: organization.createdAt,
				updatedAt: organization.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create organization")

		return OrganizationRepository.toEntity(row)
	}

	async update(organization: Organization): Promise<Organization> {
		const [row] = await this.db
			.update(organizationTable)
			.set({
				externalBillingAccountId: organization.externalBillingAccountId,
				name: organization.name,
				email: organization.email,
				updatedAt: new Date()
			})
			.where(eq(organizationTable.id, organization.id))
			.returning()
		if (!row) throw new Error("Failed to update organization")

		return OrganizationRepository.toEntity(row)
	}

	private static toEntity(row: typeof organizationTable.$inferSelect): Organization {
		return new Organization({
			id: row.id,
			externalBillingAccountId: row.externalBillingAccountId,
			name: row.name,
			email: row.email,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { OrganizationRepository }
