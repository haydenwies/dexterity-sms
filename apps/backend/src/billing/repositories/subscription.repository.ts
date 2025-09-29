import { Inject, Injectable } from "@nestjs/common"

import { Subscription } from "~/billing/entities/subscription.entity"
import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"

@Injectable()
class SubscriptionRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string): Promise<Subscription | undefined> {
		return undefined
	}

	async create(subscription: Subscription): Promise<Subscription> {
		return subscription
	}

	async update(subscription: Subscription): Promise<Subscription> {
		return subscription
	}

	async delete(subscription: Subscription): Promise<Subscription> {
		return subscription
	}
}

export { SubscriptionRepository }
