import { Phone } from "~/common/phone.vo"

interface IConversation {
	id: string
	organizationId: string
	recipient: Phone
	unreadCount: number
	lastMessagePreview?: string
	lastMessageAt?: Date
	createdAt: Date
	updatedAt: Date
}

type ConversationConstructorParams = {
	id: string
	organizationId: string
	recipient: Phone
	unreadCount?: number | null
	lastMessagePreview?: string | null
	lastMessageAt?: Date | null
	createdAt: Date
	updatedAt: Date
}

type ConversationCreateParams = {
	organizationId: string
	recipient: Phone
	unreadCount?: number
	lastMessagePreview?: string
	lastMessageAt?: Date
}

type ConversationUpdateParams = {
	lastMessagePreview: string
	lastMessageAt: Date
}

class Conversation implements IConversation {
	public readonly id: string
	public readonly organizationId: string
	public readonly recipient: Phone
	private _unreadCount: number
	private _lastMessagePreview?: string
	private _lastMessageAt?: Date
	public readonly createdAt: Date
	private _updatedAt: Date

	constructor(params: ConversationConstructorParams) {
		this.id = params.id
		this.organizationId = params.organizationId
		this.recipient = params.recipient
		this._unreadCount = params.unreadCount || 0
		this._lastMessagePreview = params.lastMessagePreview || undefined
		this._lastMessageAt = params.lastMessageAt || undefined
		this.createdAt = params.createdAt
		this._updatedAt = params.updatedAt
	}

	get unreadCount(): number {
		return this._unreadCount || 0
	}

	get lastMessagePreview(): string | undefined {
		return this._lastMessagePreview
	}

	get lastMessageAt(): Date | undefined {
		return this._lastMessageAt
	}

	get updatedAt(): Date {
		return this._updatedAt
	}

	static create(params: ConversationCreateParams): Conversation {
		return new Conversation({
			id: crypto.randomUUID(),
			organizationId: params.organizationId,
			recipient: params.recipient,
			unreadCount: params.unreadCount,
			lastMessagePreview: params.lastMessagePreview,
			lastMessageAt: params.lastMessageAt,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	}

	update(params: ConversationUpdateParams) {
		this._lastMessagePreview = params.lastMessagePreview
		this._lastMessageAt = params.lastMessageAt
		this._updatedAt = new Date()
	}

	incrementUnreadCount() {
		if (this._unreadCount) this._unreadCount++
		else this._unreadCount = 1
		this._updatedAt = new Date()
	}
}

export { Conversation }
