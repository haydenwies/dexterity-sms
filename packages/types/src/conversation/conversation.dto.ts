import z from "zod"

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

export { sendMessageDtoSchema, type SendMessageDto }
