"use server"

import { ConversationModel } from "@repo/types/message"

const getAllConversations = async (): Promise<ConversationModel[]> => {
	return [
		{
			id: "1",
			organizationId: "1",
			contactId: "1", // John Doe from contacts
			recipient: "+12345678906",
			lastMessageAt: new Date("2024-01-15T10:30:00Z"),
			lastMessagePreview: "Thanks for the update!",
			unreadCount: 2,
			createdAt: new Date("2024-01-10T09:00:00Z"),
			updatedAt: new Date("2024-01-15T10:30:00Z")
		},
		{
			id: "2",
			organizationId: "1",
			contactId: "2", // Jane Smith from contacts
			recipient: "+19876543216",
			lastMessageAt: new Date("2024-01-14T15:45:00Z"),
			lastMessagePreview: "Perfect, see you then",
			unreadCount: 0,
			createdAt: new Date("2024-01-12T11:00:00Z"),
			updatedAt: new Date("2024-01-14T15:45:00Z")
		},
		{
			id: "3",
			organizationId: "1",
			contactId: undefined, // Unknown contact
			recipient: "+15551234567",
			lastMessageAt: new Date("2024-01-13T08:20:00Z"),
			lastMessagePreview: "Is this the right number for customer support?",
			unreadCount: 1,
			createdAt: new Date("2024-01-13T08:15:00Z"),
			updatedAt: new Date("2024-01-13T08:20:00Z")
		},
		{
			id: "4",
			organizationId: "1",
			contactId: "3", // Alice Johnson from contacts
			recipient: "+11223344556",
			lastMessageAt: new Date("2024-01-12T16:10:00Z"),
			lastMessagePreview: "Got it, will follow up tomorrow",
			unreadCount: 0,
			createdAt: new Date("2024-01-08T14:00:00Z"),
			updatedAt: new Date("2024-01-12T16:10:00Z")
		}
	]
}

export { getAllConversations }
