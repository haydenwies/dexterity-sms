import z from "zod"

import { CAMPAIGN_MAX_SCHEDULE_DAYS, CampaignStatus } from "@dexterity-sms/core/campaign"
import { isEnumValue } from "@dexterity-sms/utils"

interface ICampaign {
	id: string
	organizationId: string
	status: CampaignStatus
	name: string
	body?: string
	scheduledAt?: Date
	sentAt?: Date
	failedAt?: Date
	cancelledAt?: Date
	createdAt: Date
	updatedAt: Date
}

type CampaignConstructorParams = {
	id: string
	organizationId: string
	status: CampaignStatus | string
	name: string
	body?: string | null
	scheduledAt?: Date | null
	sentAt?: Date | null
	failedAt?: Date | null
	cancelledAt?: Date | null
	createdAt: Date
	updatedAt: Date
}

type CampaignCreateParams = {
	organizationId: string
	status?: CampaignStatus
	name?: string
	body?: string
}

type CampaignUpdateParams = {
	name: string
	body?: string
}

class Campaign implements ICampaign {
	public readonly id: string
	public readonly organizationId: string
	private _status: CampaignStatus
	private _name: string
	private _body?: string
	private _scheduledAt?: Date
	private _sentAt?: Date
	private _failedAt?: Date
	private _cancelledAt?: Date
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: CampaignConstructorParams) {
		if (!isEnumValue(CampaignStatus, params.status)) throw new Error("Invalid campaign status")

		this.id = params.id
		this.organizationId = params.organizationId
		this._status = params.status
		this._name = Campaign.parseName(params.name)
		this._body = Campaign.parseBody(params.body)
		this._scheduledAt = params.scheduledAt || undefined
		this._sentAt = params.sentAt || undefined
		this._failedAt = params.failedAt || undefined
		this._cancelledAt = params.cancelledAt || undefined
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get status(): CampaignStatus {
		return this._status
	}

	get name(): string {
		return this._name
	}

	get body(): string | undefined {
		return this._body
	}

	get scheduledAt(): Date | undefined {
		return this._scheduledAt
	}

	get sentAt(): Date | undefined {
		return this._sentAt
	}

	get failedAt(): Date | undefined {
		return this._failedAt
	}

	get cancelledAt(): Date | undefined {
		return this._cancelledAt
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	static create(params: CampaignCreateParams): Campaign {
		return new Campaign({
			id: crypto.randomUUID(),
			organizationId: params.organizationId,
			status: params.status || CampaignStatus.DRAFT,
			name: params.name ? Campaign.parseName(params.name) : "Untitled campaign",
			body: params.body,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	update(params: CampaignUpdateParams) {
		this._name = Campaign.parseName(params.name)
		this._body = Campaign.parseBody(params.body)
		this._updatedAt = new Date()
	}

	/**
	 * Returns the campaign body for sending
	 */
	getBodyForSending(): string {
		if (!this._body) throw new Error("Campaign body is required")

		return this._body
	}

	// #region State Managemrnt

	/**
	 * Validates if a state transition is allowed according to the campaign flow
	 */
	private validateTransition(newStatus: CampaignStatus): void {
		const validTransitions: Record<CampaignStatus, CampaignStatus[]> = {
			[CampaignStatus.DRAFT]: [CampaignStatus.SCHEDULED],
			[CampaignStatus.SCHEDULED]: [CampaignStatus.CANCELLED, CampaignStatus.PROCESSING],
			[CampaignStatus.PROCESSING]: [CampaignStatus.SENT, CampaignStatus.FAILED],
			[CampaignStatus.CANCELLED]: [], // Finalized
			[CampaignStatus.SENT]: [], // Finalized
			[CampaignStatus.FAILED]: [] // Finalized
		}

		const allowed = validTransitions[this._status] || []
		if (!allowed.includes(newStatus)) throw new Error(`Cannot transition from ${this._status} to ${newStatus}`)
	}

	setScheduled(scheduledAt?: Date): void {
		this.validateTransition(CampaignStatus.SCHEDULED)

		if (!this._body) throw new Error("Campaign body is required")
		if (scheduledAt && scheduledAt < new Date()) throw new Error("Scheduled date is in the past")
		if (scheduledAt && scheduledAt.getDate() - new Date().getDate() > CAMPAIGN_MAX_SCHEDULE_DAYS)
			throw new Error(`Scheduled date is more than ${CAMPAIGN_MAX_SCHEDULE_DAYS} days from now`)

		this._status = CampaignStatus.SCHEDULED
		this._scheduledAt = scheduledAt
		this._updatedAt = new Date()
	}

	setCancelled(): void {
		this.validateTransition(CampaignStatus.CANCELLED)

		this._status = CampaignStatus.CANCELLED
		this._cancelledAt = new Date()
		this._updatedAt = new Date()
	}

	setProcessing(): void {
		this.validateTransition(CampaignStatus.PROCESSING)
		if (!this._body) throw new Error("Campaign body is required to mark as processing")

		this._status = CampaignStatus.PROCESSING
		this._updatedAt = new Date()
	}

	setSent(): void {
		this.validateTransition(CampaignStatus.SENT)

		this._status = CampaignStatus.SENT
		this._sentAt = new Date()
		this._updatedAt = new Date()
	}

	setFailed(): void {
		this.validateTransition(CampaignStatus.FAILED)

		this._status = CampaignStatus.FAILED
		this._failedAt = new Date()
		this._updatedAt = new Date()
	}

	// #endregion

	// #region Validation

	private static parseName(name?: string | null): ICampaign["name"] {
		const parseRes = z.string().trim().min(1, "Campaign name is required").safeParse(name)
		if (!parseRes.success) throw new Error("Invalid campaign name")

		return parseRes.data
	}

	private static parseBody(body?: string | null): ICampaign["body"] {
		if (!body || !body.trim()) return undefined

		const parseRes = z.string().trim().safeParse(body)
		if (!parseRes.success) throw new Error("Invalid campaign body")

		return parseRes.data || undefined
	}

	// #endregion
}

export { Campaign }
