"use server"

import { AddSenderDto } from "@repo/types/sender/dto/add-sender"
import { ActionResponse, actionSuccess } from "~/lib/actions"

const buySender = async (dto: AddSenderDto): Promise<ActionResponse<undefined>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { buySender }
