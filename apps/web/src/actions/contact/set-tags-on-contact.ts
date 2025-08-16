"use server"

import { type SetTagsOnContactDto } from "@repo/types/contact/dto/set-tags-on-contact"

import { type ActionResponse, actionSuccess } from "~/actions/actions"

const setTagsOnContact = async (dto: SetTagsOnContactDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { setTagsOnContact }
