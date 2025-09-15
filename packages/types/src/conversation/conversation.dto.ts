import z from "zod"

// #region CreateConversationDto

type CreateConversationDto = {
	contactId: string
}

const createConversationDtoSchema = z.object({
	contactId: z.string()
})

// #endregion

// #region SendMessageDto

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
