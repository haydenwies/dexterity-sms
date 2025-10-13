import { Injectable, Logger } from "@nestjs/common"

import { Phone } from "~/common/phone.vo"
import { Unsubscribe } from "~/unsubscribe/entities/unsubscribe.entity"
import { UnsubscribeRepository } from "~/unsubscribe/repositories/unsubscribe.repository"

@Injectable()
class UnsubscribeService {
	private readonly logger = new Logger(UnsubscribeService.name)

	// Configuration constants
	private readonly UNSUBSCRIBE_KEYWORDS = [
		"STOP",
		"STOPALL",
		"UNSUBSCRIBE",
		"CANCEL",
		"END",
		"REVOKE",
		"OPTOUT",
		"QUIT"
	]
	private readonly RESUBSCRIBE_KEYWORDS = ["START", "YES", "UNSTOP"]

	constructor(private readonly unsubscribeRepository: UnsubscribeRepository) {}

	/**
	 * Check if a phone number is unsubscribed for an organization
	 */
	async isUnsubscribed(organizationId: string, phone: Phone): Promise<boolean> {
		return await this.unsubscribeRepository.exists(organizationId, phone)
	}

	/**
	 * Unsubscribe a phone number for an organization
	 */
	async unsubscribe(organizationId: string, phone: Phone): Promise<void> {
		// Check if already unsubscribed (idempotent operation)
		const existingUnsubscribe = await this.unsubscribeRepository.findByPhone(organizationId, phone)
		if (existingUnsubscribe) {
			this.logger.warn(`Phone ${phone.value} is already unsubscribed for organization ${organizationId}`)
			return
		}

		// Create new unsubscribe record
		const unsubscribe = Unsubscribe.create({
			organizationId,
			phone
		})

		await this.unsubscribeRepository.create(unsubscribe)

		this.logger.log(`Successfully unsubscribed phone ${phone.value} for organization ${organizationId}`)
	}

	/**
	 * Re-subscribe a phone number for an organization (removes unsubscribe record)
	 */
	async resubscribe(organizationId: string, phone: Phone): Promise<void> {
		// Check if currently unsubscribed
		const existingUnsubscribe = await this.unsubscribeRepository.findByPhone(organizationId, phone)
		if (!existingUnsubscribe) {
			this.logger.warn(`Phone ${phone.value} is not unsubscribed for organization ${organizationId}`)
			return
		}

		// Delete the unsubscribe record
		await this.unsubscribeRepository.delete(organizationId, phone)

		this.logger.log(`Successfully resubscribed phone ${phone.value} for organization ${organizationId}`)
	}

	/**
	 * Get all unsubscribed numbers for an organization
	 */
	async getUnsubscribes(organizationId: string): Promise<Unsubscribe[]> {
		return await this.unsubscribeRepository.findMany(organizationId)
	}

	/**
	 * Check if a message body contains unsubscribe keywords
	 */
	isUnsubscribeMessage(body: string): boolean {
		const normalizedBody = body.trim().toUpperCase()
		return this.UNSUBSCRIBE_KEYWORDS.includes(normalizedBody)
	}

	/**
	 * Check if a message body contains resubscribe keywords
	 */
	isResubscribeMessage(body: string): boolean {
		const normalizedBody = body.trim().toUpperCase()
		return this.RESUBSCRIBE_KEYWORDS.includes(normalizedBody)
	}
}

export { UnsubscribeService }
