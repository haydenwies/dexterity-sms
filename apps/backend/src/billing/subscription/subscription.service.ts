import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"

import {
	Subscription,
	type SubscriptionCreateParams,
	type SubscriptionUpdateParams
} from "~/billing/subscription/subscription.entity"
import { SubscriptionRepository } from "~/billing/subscription/subscription.repository"

@Injectable()
class SubscriptionService {
	constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

	async get(organizationId: string): Promise<Subscription> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) throw new NotFoundException("Subscription not found")

		return subscription
	}

	async safeGet(organizationId: string): Promise<Subscription | undefined> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) return undefined

		return subscription
	}

	async create(organizationId: string, params: SubscriptionCreateParams): Promise<Subscription> {
		const existingSubscription = await this.subscriptionRepository.find(organizationId)
		if (existingSubscription) throw new ConflictException("Subscription already exists")

		const subscription = Subscription.create(params)
		const createdSubscription = await this.subscriptionRepository.create(subscription)

		return createdSubscription
	}

	async update(organizationId: string, params: SubscriptionUpdateParams): Promise<void> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) throw new NotFoundException("Subscription not found")

		subscription.update(params)
		await this.subscriptionRepository.update(subscription)
	}

	async delete(organizationId: string): Promise<void> {
		const subscription = await this.subscriptionRepository.find(organizationId)
		if (!subscription) throw new NotFoundException("Subscription not found")

		await this.subscriptionRepository.delete(subscription)
	}
}

export { SubscriptionService }
