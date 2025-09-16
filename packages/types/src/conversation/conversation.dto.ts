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
	body: string
}

const sendMessageDtoSchema = z.object({
	body: z.string().min(1, "Message body is required").max(1600, "Message too long")
})

// #endregion

export { createConversationDtoSchema, sendMessageDtoSchema, type CreateConversationDto, type SendMessageDto }
