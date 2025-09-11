import { Injectable, NotFoundException } from "@nestjs/common"

import { type SenderModel } from "@repo/types/sender"
import { type AddSenderDto } from "@repo/types/sender/dto/add-sender"
import { type RemoveSenderDto } from "@repo/types/sender/dto/remove-sender"

import { Sender } from "~/sender/sender.entity"
import { SenderRepository } from "~/sender/sender.repository"

@Injectable()
class SenderService {
	constructor(private readonly senderRepository: SenderRepository) {}

	async get(organizationId: string): Promise<Sender> {
		const sender = await this.senderRepository.find(organizationId)
		if (!sender) throw new NotFoundException("Sender not found")

		return sender
	}

	async add(organizationId: string, body: AddSenderDto): Promise<void> {}

	async remove(organizationId: string, body: RemoveSenderDto): Promise<void> {}

	async getAvailable(organizationId: string): Promise<[]> {
		return []
	}

	toDto(sender: Sender): SenderModel {
		return {
			id: sender.organizationId,
			organizationId: sender.organizationId,
			value: sender.value.value,
			createdAt: sender.createdAt
		}
	}
}

export { SenderService }
