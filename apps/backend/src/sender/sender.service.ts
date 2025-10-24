import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { EventEmitter2 } from "@nestjs/event-emitter"

import { type AddSenderDto } from "@dexterity-sms/core/sender"
import { routes } from "@dexterity-sms/routes"

import { Event } from "~/common/event.types"
import { Phone } from "~/common/phone.vo"
import { Sender } from "~/sender/entities/sender.entity"
import { SenderRepository } from "~/sender/repositories/sender.repository"
import { SMS_PROVIDER, type SmsProvider } from "~/sms/sms.module"
import { toSenderAddedEvent, toSenderRemovedEvent } from "./sender.utils"

@Injectable()
class SenderService {
	private readonly logger = new Logger(SenderService.name)

	constructor(
		private readonly senderRepository: SenderRepository,
		private readonly configService: ConfigService,
		private readonly eventEmitter: EventEmitter2,
		@Inject(SMS_PROVIDER) private readonly smsProvider: SmsProvider
	) {}

	async safeGet(organizationId: string): Promise<Sender | undefined> {
		const sender = await this.senderRepository.find(organizationId)
		if (!sender) return undefined

		return sender
	}

	async get(organizationId: string): Promise<Sender> {
		const sender = await this.senderRepository.find(organizationId)
		if (!sender) throw new NotFoundException("Sender not found")

		return sender
	}

	async safeGetByPhone(phone: Phone): Promise<Sender | undefined> {
		const sender = await this.senderRepository.findByPhone(phone)
		if (!sender) return undefined

		return sender
	}

	async getAvailablePhones(): Promise<Phone[]> {
		const availableNumbers = await this.smsProvider.getAvailableNumbers()
		const phones = availableNumbers.slice(0, 5).map((number) => Phone.create(number)) // TODO: Find better way to limit

		return phones
	}

	async add(organizationId: string, body: AddSenderDto): Promise<void> {
		// Check for existing sender
		const existingSender = await this.senderRepository.find(organizationId)
		if (existingSender) {
			this.logger.warn(`Sender already exists for organization ${organizationId} when attempting to add sender`)
			throw new BadRequestException("A sender already exists for this organization")
		}

		// Create phone from body
		const phone = Phone.create(body.phone)

		try {
			// Buy new number from provider with callback URL
			const inboundCallbackUrl = `${this.configService.getOrThrow<string>("router.backendPublicUrl")}${routes.backend.INBOUND_MESSAGE_WEBHOOK}`
			const res = await this.smsProvider.buyNumber(phone.value, { inboundCallbackUrl })

			// Create new sender
			const sender = Sender.create({
				organizationId,
				externalId: res.id,
				phone
			})
			const createdSender = await this.senderRepository.create(sender)

			// Emit sender added event for billing
			await this.eventEmitter.emitAsync(Event.SENDER_ADDED, toSenderAddedEvent(createdSender))
		} catch (err: unknown) {
			this.logger.error(`Failed to add sender for organization ${organizationId}`, err)
			throw new InternalServerErrorException("Failed to add sender")
		}
	}

	async remove(organizationId: string): Promise<void> {
		const sender = await this.senderRepository.find(organizationId)
		if (!sender) {
			this.logger.warn(`Sender not found for organization ${organizationId} when attempting to remove sender`)
			throw new NotFoundException("Sender not found")
		}

		try {
			// Release number from provider
			await this.smsProvider.releaseNumber(sender.externalId)

			// Delete sender from database
			await this.senderRepository.delete(sender)

			// Emit sender removed event for billing (before deletion)
			await this.eventEmitter.emitAsync(Event.SENDER_REMOVED, toSenderRemovedEvent(sender))
		} catch (err: unknown) {
			this.logger.error(`Failed to remove sender for organization ${organizationId}`, err)
			throw new InternalServerErrorException("Failed to remove sender")
		}
	}
}

export { SenderService }
