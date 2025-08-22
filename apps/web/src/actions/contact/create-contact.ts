"use server"

import { CreateContactDto } from "@repo/types/contact/dto/create-contact"

import { type ActionResponse, actionSuccess } from "~/lib/actions"

const createContact = async (dto: CreateContactDto): Promise<ActionResponse<undefined>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { createContact }
