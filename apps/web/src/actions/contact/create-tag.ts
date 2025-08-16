"use server"

import { ContactTagModel } from "@repo/types/contact"
import { type CreateContactTagDto } from "@repo/types/contact/dto/create-contact-tag"

import { type ActionResponse, actionSuccess } from "~/actions/actions"

const createTag = async (dto: CreateContactTagDto): Promise<ActionResponse<ContactTagModel>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess({
		id: "1",
		name: dto.name,
		color: dto.color,
		organizationId: "1",
		createdAt: new Date(),
		updatedAt: new Date()
	})
}

export { createTag }
