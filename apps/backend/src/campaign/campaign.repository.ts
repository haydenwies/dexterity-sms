import { Inject, Injectable } from "@nestjs/common"
import { and, eq, inArray } from "drizzle-orm"

import { Campaign } from "~/campaign/campaign.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { campaignTable } from "~/database/database.schema"

@Injectable()
class CampaignRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string, campaignId: string): Promise<Campaign | undefined> {
		const [row] = await this.db
			.select()
			.from(campaignTable)
			.where(and(eq(campaignTable.organizationId, organizationId), eq(campaignTable.id, campaignId)))
			.limit(1)
		if (!row) return undefined

		return CampaignRepository.toEntity(row)
	}

	async findMany(organizationId: string, ids?: string[]): Promise<Campaign[]> {
		const query = []
		if (ids) query.push(inArray(campaignTable.id, ids))

		const rows = await this.db
			.select()
			.from(campaignTable)
			.where(and(eq(campaignTable.organizationId, organizationId), ...query))

		return rows.map((row) => CampaignRepository.toEntity(row))
	}

	async create(campaign: Campaign): Promise<Campaign> {
		const [row] = await this.db
			.insert(campaignTable)
			.values({
				id: campaign.id,
				organizationId: campaign.organizationId,
				status: campaign.status,
				name: campaign.name,
				body: campaign.body,
				createdAt: campaign.createdAt,
				updatedAt: campaign.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create campaign")

		return CampaignRepository.toEntity(row)
	}

	async update(campaign: Campaign): Promise<Campaign> {
		const [row] = await this.db
			.update(campaignTable)
			.set({
				status: campaign.status,
				name: campaign.name,
				body: campaign.body || undefined,
				updatedAt: campaign.updatedAt
			})
			.where(eq(campaignTable.id, campaign.id))
			.returning()
		if (!row) throw new Error("Failed to update campaign")

		return CampaignRepository.toEntity(row)
	}

	async delete(campaign: Campaign): Promise<Campaign> {
		const [row] = await this.db.delete(campaignTable).where(eq(campaignTable.id, campaign.id)).returning()
		if (!row) throw new Error("Failed to delete campaign")

		return CampaignRepository.toEntity(row)
	}

	async deleteMany(campaigns: Campaign[]): Promise<Campaign[]> {
		if (campaigns.length === 0) return []

		const campaignIds = campaigns.map((campaign) => campaign.id)
		const rows = await this.db.delete(campaignTable).where(inArray(campaignTable.id, campaignIds)).returning()

		return rows.map((row) => CampaignRepository.toEntity(row))
	}

	private static toEntity(row: typeof campaignTable.$inferSelect): Campaign {
		return new Campaign({
			id: row.id,
			organizationId: row.organizationId,
			status: row.status,
			name: row.name,
			body: row.body,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { CampaignRepository }
