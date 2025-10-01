import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common"
import { EventEmitter2 } from "@nestjs/event-emitter"

import { type AddSenderDto } from "@repo/types/sender"

import { Event } from "~/common/event.types"
import { Phone } from "~/common/phone.vo"
import { Sender } from "~/sender/sender.entity"
import { SenderRepository } from "~/sender/sender.repository"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"
import { toSenderAddedEvent, toSenderRemovedEvent } from "./sender.utils"

@Injectable()
class SenderService {
	private readonly logger = new Logger(SenderService.name)

	constructor(
		private readonly senderRepository: SenderRepository,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider,
		private readonly eventEmitter: EventEmitter2
	) {}

	async safeGet(organizationId: string): Promise<Sender | undefined> {
		const sender = await this.senderRepository.find(organizationId)

		return sender
	}

	async get(organizationId: string): Promise<Sender> {
		const sender = await this.senderRepository.find(organizationId)
		if (!sender) throw new NotFoundException("Sender not found")

		return sender
	}

	async findByPhone(phone: Phone): Promise<Sender | undefined> {
		const sender = await this.senderRepository.findByPhone(phone)

		return sender
	}

	async getAvailablePhones(): Promise<Phone[]> {
		const availableNumbers = await this.smsProvider.getAvailableNumbers()
		const phones = availableNumbers.slice(0, 5).map((number) => Phone.create(number)) // TODO: Find better way to limit

		return phones
	}

	async add(organizationId: string, body: AddSenderDto): Promise<void> {
		const existingSender = await this.senderRepository.find(organizationId)
		if (existingSender) throw new BadRequestException("Sender already exists for organization")

		const phone = Phone.create(body.phone)

		const res = await this.smsProvider.buyNumber(phone.value)

		const sender = Sender.create({
			organizationId,
			externalId: res.id,
			phone
		})
		const createdSender = await this.senderRepository.create(sender)

		// Emit sender added event for billing
		await this.eventEmitter.emitAsync(Event.SENDER_ADDED, toSenderAddedEvent(createdSender))
	}

	async remove(organizationId: string): Promise<void> {
		const sender = await this.senderRepository.find(organizationId)
		if (!sender) throw new NotFoundException("Sender not found")

		// Emit sender removed event for billing (before deletion)
		await this.eventEmitter.emitAsync(Event.SENDER_REMOVED, toSenderRemovedEvent(sender))

		await this.smsProvider.releaseNumber(sender.externalId)
		await this.senderRepository.delete(sender)
	}
}

export { SenderService }
