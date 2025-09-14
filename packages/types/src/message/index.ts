import z from "zod"

export * from "./message.enum"
export * from "./message.type"

// #region dtos

type CreateConversationDto = {
	contactId: string
}

const createConversationDtoSchema = z.object({
	contactId: z.string()
})

type SendMessageDto = {
	conversationId: string
	body: string
}

const sendMessageDtoSchema = z.object({
	conversationId: z.string(),
	body: z.string().min(1, "Message body is required").max(1600, "Message too long")
})

// #endregion

export { createConversationDtoSchema, sendMessageDtoSchema, type CreateConversationDto, type SendMessageDto }
