"use server"

import { type SendMessageDto } from "@repo/types/message/dto/send-message"

import { ActionResponse, actionSuccess } from "~/lib/actions"

const sendMessage = async (dto: SendMessageDto): Promise<ActionResponse<void>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { sendMessage }
