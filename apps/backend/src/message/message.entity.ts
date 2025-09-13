import { MessageDirection, MessageStatus } from "@repo/types/message"
import { isEnumValue } from "@repo/utils"

import { Phone } from "~/common/phone.vo"

type MessageConstructorParams = {
	id: string
	externalId?: string | null
	organizationId: string
	conversationId?: string | null
	campaignId?: string | null
	direction: MessageDirection | string
	status: MessageStatus | string
	from: Phone
	to: Phone
	body: string
	sentAt?: Date
	deliveredAt?: Date
	readAt?: Date
	createdAt: Date
	updatedAt: Date
}

type MessageCreateParams = {
	externalId?: string
	organizationId: string
	conversationId?: string | null
	campaignId?: string | null
	direction: MessageDirection
	status?: MessageStatus
	from: Phone
	to: Phone
	body: string
}

class Message {
	public readonly id: string
	private _externalId: string | null
	public readonly organizationId: string
	private _conversationId: string | null
	public readonly campaignId: string | null
	public readonly direction: MessageDirection
	private _status: MessageStatus
	public readonly from: Phone
	public readonly to: Phone
	public readonly body: string
	private _sentAt?: Date
	private _deliveredAt?: Date
	private _readAt?: Date
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: MessageConstructorParams) {
		if (!isEnumValue(MessageDirection, params.direction)) throw new Error("Invalid message direction")
		if (!isEnumValue(MessageStatus, params.status)) throw new Error("Invalid message status")

		this.id = params.id
		this._externalId = params.externalId || null
		this.organizationId = params.organizationId
		this._conversationId = params.conversationId || null
		this.campaignId = params.campaignId || null
		this.direction = params.direction
		this._status = params.status
		this.body = params.body
		this.from = params.from
		this.to = params.to
		this._sentAt = params.sentAt
		this._deliveredAt = params.deliveredAt
		this._readAt = params.readAt
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get externalId(): string | null {
		return this._externalId
	}

	get conversationId(): string | null {
		return this._conversationId
	}

	get status(): MessageStatus {
		return this._status
	}

	get sentAt(): Date | undefined {
		return this._sentAt
	}

	get deliveredAt(): Date | undefined {
		return this._deliveredAt
	}

	get readAt(): Date | undefined {
		return this._readAt
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	static create(params: MessageCreateParams): Message {
		return new Message({
			id: crypto.randomUUID(),
			externalId: params.externalId,
			organizationId: params.organizationId,
			conversationId: params.conversationId,
			campaignId: params.campaignId,
			direction: params.direction,
			status: params.status || MessageStatus.PENDING,
			body: params.body,
			from: params.from,
			to: params.to,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	updateExternalId(externalId: string): void {
		this._externalId = externalId
		this._updatedAt = new Date()
	}

	updateConversationId(conversationId: string): void {
		this._conversationId = conversationId
		this._updatedAt = new Date()
	}

	updateStatus(status: MessageStatus): void {
		this._status = status
		this._updatedAt = new Date()

		switch (status) {
			case MessageStatus.SENT:
				this._sentAt = new Date()
				break
			case MessageStatus.DELIVERED:
				this._deliveredAt = new Date()
				break
			case MessageStatus.READ:
				this._readAt = new Date()
				break
		}
	}
}

export { Message }
