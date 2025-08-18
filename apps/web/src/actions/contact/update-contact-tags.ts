"use server"

import { type UpdateContactTagsDto } from "@repo/types/contact/dto/update-contact-tags"

import { type ActionResponse, actionSuccess } from "~/actions/actions"

const updateContactTags = async (dto: UpdateContactTagsDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { updateContactTags }
