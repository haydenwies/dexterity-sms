import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common"

import { addSenderDtoSchema, type AddSenderDto, type SenderModel } from "@dexterity-sms/core/sender"

import { AuthGuard } from "~/auth/auth.guard"
import { SubscriptionGuard } from "~/billing/guards/subscription.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { MemberGuard } from "~/organization/guards/member.guard"
import { SenderService } from "~/sender/sender.service"
import { toSenderDto } from "./sender.utils"

@UseGuards(AuthGuard, MemberGuard)
@Controller("organizations/:organizationId/sender")
class SenderController {
	constructor(private readonly senderService: SenderService) {}

	@Get()
	async get(@Param("organizationId") organizationId: string): Promise<SenderModel> {
		const sender = await this.senderService.get(organizationId)

		return toSenderDto(sender)
	}

	@UseGuards(SubscriptionGuard)
	@Post()
	async add(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(addSenderDtoSchema)) body: AddSenderDto
	): Promise<void> {
		await this.senderService.add(organizationId, body)
	}

	@Delete()
	async remove(@Param("organizationId") organizationId: string): Promise<void> {
		await this.senderService.remove(organizationId)
	}

	@Get("available")
	async getAvailablePhones(): Promise<string[]> {
		const senders = await this.senderService.getAvailablePhones()

		return senders.map((sender) => sender.value)
	}
}

export { SenderController }
