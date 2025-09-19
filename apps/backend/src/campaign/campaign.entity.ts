import { CampaignStatus } from "@repo/types/campaign"
import { isEnumValue } from "@repo/utils"

type CampaignConstructorParams = {
	id: string
	organizationId: string
	status: CampaignStatus | string
	name: string
	body?: string | null
	scheduledAt?: Date
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

class Campaign {
	public readonly id: string
	public readonly organizationId: string
	private _status: CampaignStatus
	private _name: string
	private _body?: string
	private _scheduledAt?: Date
	public readonly createdAt: Date
	private _updatedAt: Date

	private static readonly MAX_SCHEDULED_TIME = 1000 * 60 * 60 * 24 * 14

	constructor(params: CampaignConstructorParams) {
		if (!isEnumValue(CampaignStatus, params.status)) throw new Error("Invalid campaign status")

		this.id = params.id
		this.organizationId = params.organizationId
		this._status = params.status
		this._name = params.name
		this._body = params.body || undefined
		this._scheduledAt = params.scheduledAt || undefined
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

	get updatedAt(): Date {
		return this._updatedAt
	}

	static create(params: CampaignCreateParams): Campaign {
		return new Campaign({
			id: crypto.randomUUID(),
			organizationId: params.organizationId,
			status: params.status || CampaignStatus.DRAFT,
			name: params.name || "Untitled campaign",
			body: params.body,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	update(params: CampaignUpdateParams) {
		this._name = params.name
		this._body = params.body
		this._updatedAt = new Date()
	}

	canSendTest(): boolean {
		if (this._status !== CampaignStatus.DRAFT) return false
		else if (!this._body) return false

		return true
	}

	canSend(): boolean {
		if (this._status !== CampaignStatus.SCHEDULED) return false
		else if (!this._body) return false

		return true
	}

	canCancel(): boolean {
		if (this._status !== CampaignStatus.SCHEDULED) return false

		return true
	}

	sendTest(): { body: string } {
		if (!this.canSendTest()) throw new Error("Campaign test cannot be sent")
		else if (!this._body) throw new Error("Campaign body is required")

		return { body: this._body }
	}

	schedule(scheduledAt?: Date): void {
		if (this._status !== CampaignStatus.DRAFT) throw new Error("Campaign cannot be scheduled")
		else if (!this._body) throw new Error("Campaign body is required")
		else if (scheduledAt && scheduledAt < new Date()) throw new Error("Scheduled date is in the past")
		else if (scheduledAt && scheduledAt.getTime() - new Date().getTime() > Campaign.MAX_SCHEDULED_TIME)
			throw new Error("Scheduled date is more than 14 days from now")

		this._status = CampaignStatus.SCHEDULED
		this._scheduledAt = scheduledAt
		this._updatedAt = new Date()
	}

	send(): { body: string } {
		if (!this.canSend()) throw new Error("Campaign cannot be sent")
		else if (!this._body) throw new Error("Campaign body is required")

		this._status = CampaignStatus.SENT
		this._updatedAt = new Date()

		return { body: this._body }
	}

	cancel(): void {
		if (!this.canCancel()) throw new Error("Campaign cannot be cancelled")

		this._status = CampaignStatus.CANCELLED
		this._updatedAt = new Date()
	}

	updateStatusFromMessages(messageStatusCounts: {
		sent: number
		delivered: number
		failed: number
		total: number
	}): boolean {
		if (this._status !== CampaignStatus.SENT) return false

		const { sent, delivered, failed, total } = messageStatusCounts

		// If all messages failed, mark campaign as failed
		if (failed === total && total > 0) {
			this._status = CampaignStatus.FAILED
			this._updatedAt = new Date()
			return true
		}

		// Campaign remains SENT if there are still pending messages or some succeeded
		// Additional status logic can be added here if needed (e.g., PARTIALLY_DELIVERED)

		return false
	}
}

export { Campaign }
