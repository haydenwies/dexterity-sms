"use server"

import { type CreateConversationDto } from "@repo/types/message/dto/create-conversation"

import { type ActionResponse, actionSuccess } from "~/lib/actions"

const createConversation = async (dto: CreateConversationDto): Promise<ActionResponse<undefined>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { createConversation }
