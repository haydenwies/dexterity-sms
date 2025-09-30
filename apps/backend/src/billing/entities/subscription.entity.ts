import { SubscriptionStatus } from "@repo/types/billing"
import { isEnumValue } from "@repo/utils"

interface ISubscription {
	organizationId: string
	externalId: string
	status: SubscriptionStatus
	cancelAtPeriodEnd: boolean
	createdAt: Date
	updatedAt: Date
}

type SubscriptionConstructorParams = {
	organizationId: string
	externalId: string
	status: SubscriptionStatus | string
	cancelAtPeriodEnd: boolean
	createdAt: Date
	updatedAt: Date
}

type SubscriptionCreateParams = {
	organizationId: string
	externalId: string
	status: SubscriptionStatus
	cancelAtPeriodEnd: boolean
}

type SubscriptionUpdateParams = {
	status: SubscriptionStatus
	cancelAtPeriodEnd: boolean
}

class Subscription implements ISubscription {
	public readonly organizationId: string
	public readonly externalId: string
	private _status: SubscriptionStatus
	private _cancelAtPeriodEnd: boolean
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: SubscriptionConstructorParams) {
		if (!isEnumValue(SubscriptionStatus, params.status)) throw new Error("Invalid subscription status")

		this.organizationId = params.organizationId
		this.externalId = params.externalId
		this._status = params.status
		this._cancelAtPeriodEnd = params.cancelAtPeriodEnd
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get status(): SubscriptionStatus {
		return this._status
	}

	get cancelAtPeriodEnd(): boolean {
		return this._cancelAtPeriodEnd
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	static create(params: SubscriptionCreateParams): Subscription {
		return new Subscription({
			organizationId: params.organizationId,
			externalId: params.externalId,
			status: params.status,
			cancelAtPeriodEnd: params.cancelAtPeriodEnd,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	update(params: SubscriptionUpdateParams) {
		this._status = params.status
		this._cancelAtPeriodEnd = params.cancelAtPeriodEnd
		this._updatedAt = new Date()
	}
}

export { Subscription, type SubscriptionCreateParams, type SubscriptionUpdateParams }
