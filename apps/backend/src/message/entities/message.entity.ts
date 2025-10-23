import { MessageDirection, MessageErrorCode, MessageStatus } from "@repo/types/message"
import { isEnumValue } from "@repo/utils"

import { Phone } from "~/common/phone.vo"

interface IMessage {
	id: string
	organizationId: string
	externalId?: string
	conversationId?: string
	campaignId?: string
	direction: MessageDirection
	status: MessageStatus
	from: Phone
	to: Phone
	body: string
	errorCode?: MessageErrorCode
	sentAt?: Date
	deliveredAt?: Date
	createdAt: Date
	updatedAt: Date
}

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
	errorCode?: MessageErrorCode | string | null
	sentAt?: Date | null
	deliveredAt?: Date | null
	readAt?: Date | null
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

class Message implements IMessage {
	public readonly id: string
	public readonly organizationId: string
	private _externalId?: string
	private _conversationId?: string
	public readonly campaignId?: string
	public readonly direction: MessageDirection
	private _status: MessageStatus
	public readonly from: Phone
	public readonly to: Phone
	public readonly body: string
	private _errorCode?: MessageErrorCode
	private _sentAt?: Date
	private _deliveredAt?: Date
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: MessageConstructorParams) {
		if (!isEnumValue(MessageDirection, params.direction)) throw new Error("Invalid message direction")
		if (!isEnumValue(MessageStatus, params.status)) throw new Error("Invalid message status")
		if (
			params.errorCode !== undefined &&
			params.errorCode !== null &&
			!isEnumValue(MessageErrorCode, params.errorCode)
		)
			throw new Error("Invalid message error code")

		this.id = params.id
		this.organizationId = params.organizationId
		this._externalId = params.externalId || undefined
		this._conversationId = params.conversationId || undefined
		this.campaignId = params.campaignId || undefined
		this.direction = params.direction
		this._status = params.status
		this.body = params.body
		this.from = params.from
		this.to = params.to
		this._errorCode = params.errorCode || undefined
		this._sentAt = params.sentAt || undefined
		this._deliveredAt = params.deliveredAt || undefined
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get externalId(): string | undefined {
		return this._externalId
	}

	get conversationId(): string | undefined {
		return this._conversationId
	}

	get status(): MessageStatus {
		return this._status
	}

	get errorCode(): MessageErrorCode | undefined {
		return this._errorCode
	}

	get sentAt(): Date | undefined {
		return this._sentAt
	}

	get deliveredAt(): Date | undefined {
		return this._deliveredAt
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
			status: params.status || MessageStatus.PROCESSING,
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

	updateStatus(status: MessageStatus, errorCode?: MessageErrorCode): void {
		this._status = status
		this._updatedAt = new Date()

		switch (status) {
			case MessageStatus.SENT:
				this._sentAt = new Date()
				break
			case MessageStatus.DELIVERED:
				this._deliveredAt = new Date()
				break
			case MessageStatus.FAILED:
				if (errorCode) this._errorCode = errorCode
				else this._errorCode = MessageErrorCode.UNKNOWN
				break
		}
	}
}

export { Message }
