import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common"

import { addSenderDtoSchema, type AddSenderDto, type SenderModel } from "@repo/types/sender"

import { AuthGuard } from "~/auth/auth.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { OrganizationGuard } from "~/organization/organization.guard"
import { SenderService } from "~/sender/sender.service"

@UseGuards(AuthGuard, OrganizationGuard)
@Controller("organizations/:organizationId/sender")
class SenderController {
	constructor(private readonly senderService: SenderService) {}

	@Get()
	async get(@Param("organizationId") organizationId: string): Promise<SenderModel> {
		const sender = await this.senderService.get(organizationId)

		return this.senderService.toDto(sender)
	}

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
	async getAvailable(): Promise<string[]> {
		const senders = await this.senderService.getAvailable()

		return senders.map((sender) => sender.value)
	}
}

export { SenderController }
