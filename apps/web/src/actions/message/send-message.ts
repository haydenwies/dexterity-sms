"use server"

import { type SendMessageDto } from "@repo/types/conversation"

import { type ActionResponse, actionSuccess } from "~/lib/actions"

const sendMessage = async (dto: SendMessageDto): Promise<ActionResponse<undefined>> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log("Sending message:", dto)

	// In real implementation, this would:
	// 1. Look up contact by contactId to get phone number
	// 2. Find or create conversation for that phone number
	// 3. Create message record
	// 4. Send via SMS provider
	// 5. Return success/error

	return actionSuccess(undefined)
}

export { sendMessage }
