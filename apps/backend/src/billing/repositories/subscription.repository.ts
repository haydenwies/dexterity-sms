import { Inject, Injectable } from "@nestjs/common"
import { eq } from "drizzle-orm"

import { Subscription } from "~/billing/entities/subscription.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { subscriptionTable } from "~/database/database.schema"

@Injectable()
class SubscriptionRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string): Promise<Subscription | undefined> {
		const [row] = await this.db
			.select()
			.from(subscriptionTable)
			.where(eq(subscriptionTable.organizationId, organizationId))
			.limit(1)
		if (!row) return undefined

		return SubscriptionRepository.toEntity(row)
	}

	async create(subscription: Subscription): Promise<Subscription> {
		const [row] = await this.db
			.insert(subscriptionTable)
			.values({
				organizationId: subscription.organizationId,
				externalId: subscription.externalId,
				status: subscription.status,
				cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
				createdAt: subscription.createdAt,
				updatedAt: subscription.updatedAt
			})
			.returning()
		if (!row) throw new Error("Failed to create subscription")

		return SubscriptionRepository.toEntity(row)
	}

	async update(subscription: Subscription): Promise<Subscription> {
		const [row] = await this.db
			.update(subscriptionTable)
			.set({
				status: subscription.status,
				cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
				updatedAt: subscription.updatedAt
			})
			.where(eq(subscriptionTable.organizationId, subscription.organizationId))
			.returning()
		if (!row) throw new Error("Failed to update subscription")

		return SubscriptionRepository.toEntity(row)
	}

	async delete(subscription: Subscription): Promise<Subscription> {
		const [row] = await this.db
			.delete(subscriptionTable)
			.where(eq(subscriptionTable.organizationId, subscription.organizationId))
			.returning()
		if (!row) throw new Error("Failed to delete subscription")

		return SubscriptionRepository.toEntity(row)
	}

	private static toEntity(row: typeof subscriptionTable.$inferSelect): Subscription {
		return new Subscription({
			organizationId: row.organizationId,
			externalId: row.externalId,
			status: row.status,
			cancelAtPeriodEnd: row.cancelAtPeriodEnd,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt
		})
	}
}

export { SubscriptionRepository }
