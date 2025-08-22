"use server"

import { type DeleteManyContactsDto } from "@repo/types/contact/dto/delete-many-contacts"

import { type ActionResponse, actionSuccess } from "~/lib/actions"

const deleteManyContacts = async (dto: DeleteManyContactsDto): Promise<ActionResponse<undefined>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { deleteManyContacts }
