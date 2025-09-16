"use server"

import { type ConversationModel } from "@repo/types/conversation"

const getAllConversations = async (): Promise<ConversationModel[]> => {
	return [
		{
			id: "1",
			organizationId: "1",
			recipient: "+12345678906"
		},
		{
			id: "2",
			organizationId: "1",
			recipient: "+19876543216"
		},
		{
			id: "3",
			organizationId: "1",
			recipient: "+15551234567"
		},
		{
			id: "4",
			organizationId: "1",
			recipient: "+11223344556"
		}
	]
}

export { getAllConversations }
