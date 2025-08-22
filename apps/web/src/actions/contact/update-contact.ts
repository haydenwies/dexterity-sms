"use server"

import { type UpdateContactDto } from "@repo/types/contact/dto/update-contact"

import { type ActionResponse, actionSuccess } from "~/lib/actions"

const updateContact = async (contactId: string, dto: UpdateContactDto): Promise<ActionResponse<undefined>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { updateContact }
