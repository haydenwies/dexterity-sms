"use server"

import { type CreateConversationDto } from "@repo/types/conversation"

const createConversation = async (dto: CreateConversationDto): Promise<undefined> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)
}

export { createConversation }
