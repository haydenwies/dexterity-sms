import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common"

import { type AddSenderDto, type SenderModel } from "@repo/types/sender"

import { Phone } from "~/common/phone.vo"
import { MessageService } from "~/message/message.service"
import { Sender } from "~/sender/sender.entity"
import { SenderRepository } from "~/sender/sender.repository"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"

@Injectable()
class SenderService {
	constructor(
		private readonly senderRepository: SenderRepository,
		private readonly messageService: MessageService,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider
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
		await this.senderRepository.create(sender)
	}

	async remove(organizationId: string): Promise<void> {
		// Check for pending messages first
		const pendingCount = await this.messageService.countPending(organizationId)
		if (pendingCount > 0) {
			throw new BadRequestException(`Cannot remove sender. ${pendingCount} messages are still pending delivery.`)
		}

		const sender = await this.senderRepository.find(organizationId)
		if (!sender) throw new NotFoundException("Sender not found")

		await this.smsProvider.releaseNumber(sender.externalId)
		await this.senderRepository.delete(sender)
	}

	toDto(sender: Sender): SenderModel {
		return {
			id: sender.phone.value,
			organizationId: sender.organizationId,
			value: sender.phone.value,
			createdAt: sender.createdAt
		}
	}
}

export { SenderService }
