import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common"

import { type SenderModel } from "@repo/types/sender"
import { type AddSenderDto } from "@repo/types/sender/dto/add-sender"

import { Phone } from "~/common/phone.vo"
import { Sender } from "~/sender/sender.entity"
import { SenderRepository } from "~/sender/sender.repository"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"

@Injectable()
class SenderService {
	constructor(
		private readonly senderRepository: SenderRepository,
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

	async getAvailable(): Promise<Sender[]> {
		const availableNumbers = await this.smsProvider.getAvailableNumbers()
		const phones = availableNumbers.map((number) => Phone.create(number))

		return phones.map((phone) => Sender.create({ phone }))
	}

	async add(organizationId: string, body: AddSenderDto): Promise<void> {
		const existingSender = await this.senderRepository.find(organizationId)
		if (existingSender) throw new BadRequestException("Sender already exists for organization")

		const phone = Phone.create(body.phone)

		await this.smsProvider.buyNumber(phone.value)

		const sender = Sender.create({
			organizationId,
			phone
		})
		await this.senderRepository.create(sender)
	}

	async remove(organizationId: string): Promise<void> {
		const sender = await this.senderRepository.find(organizationId)
		if (!sender) throw new NotFoundException("Sender not found")

		await this.smsProvider.releaseNumber(sender.phone.value)
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
