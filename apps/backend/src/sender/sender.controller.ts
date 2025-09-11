import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common"

import { type SenderModel } from "@repo/types/sender"
import { addSenderDtoSchema, type AddSenderDto } from "@repo/types/sender/dto/add-sender"
import { removeSenderDtoSchema, type RemoveSenderDto } from "@repo/types/sender/dto/remove-sender"

import { AuthGuard } from "~/auth/auth.guard"
import { ZodValidationPipe } from "~/common/zod-validation.pipe"
import { SenderService } from "~/sender/sender.service"

@UseGuards(AuthGuard) // TODO: Implement organization guard
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
	async remove(
		@Param("organizationId") organizationId: string,
		@Body(new ZodValidationPipe(removeSenderDtoSchema)) body: RemoveSenderDto
	): Promise<void> {
		await this.senderService.remove(organizationId, body)
	}
}

export { SenderController }
