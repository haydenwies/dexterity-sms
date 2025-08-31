"use server"

import { RemoveSenderDto } from "@repo/types/sender/dto/remove-sender"

import { ActionResponse, actionSuccess } from "~/lib/actions"

const removeSender = async (dto: RemoveSenderDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { removeSender }
