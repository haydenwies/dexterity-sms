import { CampaignStatus } from "@repo/types/campaign/enums"
import { isEnumValue } from "@repo/utils"

type CampaignConstructorParams = {
	id: string
	organizationId: string
	status: CampaignStatus | string
	name: string
	body?: string | null
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
	public readonly createdAt: Date
	public readonly updatedAt: Date

	constructor(params: CampaignConstructorParams) {
		if (!isEnumValue(CampaignStatus, params.status)) throw new Error("Invalid campaign status")

		this.id = params.id
		this.organizationId = params.organizationId
		this._status = params.status
		this._name = params.name
		this._body = params.body || undefined
		this.createdAt = params.createdAt
		this.updatedAt = params.updatedAt
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
	}
}

export { Campaign }
