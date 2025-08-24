"use server"

import { MessageModel } from "@repo/types/message"
import { MessageDirection, MessageStatus } from "@repo/types/message/enums"

const getConversationMessages = async (conversationId: string): Promise<MessageModel[]> => {
	// Mock data based on conversation ID
	if (conversationId === "1") {
		return [
			{
				id: "1",
				organizationId: "1",
				conversationId: "1",
				externalId: "sms_123",
				direction: MessageDirection.OUTBOUND,
				status: MessageStatus.DELIVERED,
				body: "Hi John! Just wanted to follow up on your recent order.",
				from: "+15551234567", // org number
				to: "+12345678906", // contact number
				sentAt: new Date("2024-01-15T10:00:00Z"),
				deliveredAt: new Date("2024-01-15T10:01:00Z"),
				createdAt: new Date("2024-01-15T10:00:00Z"),
				updatedAt: new Date("2024-01-15T10:01:00Z")
			},
			{
				id: "2",
				organizationId: "1",
				conversationId: "1",
				externalId: "sms_124",
				direction: MessageDirection.INBOUND,
				status: MessageStatus.RECEIVED,
				body: "Hi! Yes, I received it yesterday. Everything looks great!",
				from: "+12345678906",
				to: "+15551234567",
				sentAt: new Date("2024-01-15T10:15:00Z"),
				createdAt: new Date("2024-01-15T10:15:00Z"),
				updatedAt: new Date("2024-01-15T10:15:00Z")
			},
			{
				id: "3",
				organizationId: "1",
				conversationId: "1",
				externalId: "sms_125",
				direction: MessageDirection.OUTBOUND,
				status: MessageStatus.DELIVERED,
				body: "Wonderful! Please let us know if you need anything else.",
				from: "+15551234567",
				to: "+12345678906",
				sentAt: new Date("2024-01-15T10:25:00Z"),
				deliveredAt: new Date("2024-01-15T10:26:00Z"),
				createdAt: new Date("2024-01-15T10:25:00Z"),
				updatedAt: new Date("2024-01-15T10:26:00Z")
			},
			{
				id: "4",
				organizationId: "1",
				conversationId: "1",
				externalId: "sms_126",
				direction: MessageDirection.INBOUND,
				status: MessageStatus.RECEIVED,
				body: "Thanks for the update!",
				from: "+12345678906",
				to: "+15551234567",
				sentAt: new Date("2024-01-15T10:30:00Z"),
				createdAt: new Date("2024-01-15T10:30:00Z"),
				updatedAt: new Date("2024-01-15T10:30:00Z")
			}
		]
	}

	if (conversationId === "2") {
		return [
			{
				id: "5",
				organizationId: "1",
				conversationId: "2",
				externalId: "sms_127",
				direction: MessageDirection.OUTBOUND,
				status: MessageStatus.DELIVERED,
				body: "Hi Jane, our meeting is still on for 3pm tomorrow, right?",
				from: "+15551234567",
				to: "+19876543216",
				sentAt: new Date("2024-01-14T15:30:00Z"),
				deliveredAt: new Date("2024-01-14T15:31:00Z"),
				createdAt: new Date("2024-01-14T15:30:00Z"),
				updatedAt: new Date("2024-01-14T15:31:00Z")
			},
			{
				id: "6",
				organizationId: "1",
				conversationId: "2",
				externalId: "sms_128",
				direction: MessageDirection.INBOUND,
				status: MessageStatus.RECEIVED,
				body: "Perfect, see you then",
				from: "+19876543216",
				to: "+15551234567",
				sentAt: new Date("2024-01-14T15:45:00Z"),
				createdAt: new Date("2024-01-14T15:45:00Z"),
				updatedAt: new Date("2024-01-14T15:45:00Z")
			}
		]
	}

	if (conversationId === "3") {
		return [
			{
				id: "7",
				organizationId: "1",
				conversationId: "3",
				externalId: "sms_129",
				direction: MessageDirection.INBOUND,
				status: MessageStatus.RECEIVED,
				body: "Hi, I found this number online. Is this the right number for customer support?",
				from: "+15551234567",
				to: "+15551234567",
				sentAt: new Date("2024-01-13T08:15:00Z"),
				createdAt: new Date("2024-01-13T08:15:00Z"),
				updatedAt: new Date("2024-01-13T08:15:00Z")
			},
			{
				id: "8",
				organizationId: "1",
				conversationId: "3",
				externalId: "sms_130",
				direction: MessageDirection.INBOUND,
				status: MessageStatus.RECEIVED,
				body: "Is this the right number for customer support?",
				from: "+15551234567",
				to: "+15551234567",
				sentAt: new Date("2024-01-13T08:20:00Z"),
				createdAt: new Date("2024-01-13T08:20:00Z"),
				updatedAt: new Date("2024-01-13T08:20:00Z")
			}
		]
	}

	// Default empty array for unknown conversations
	return []
}

export { getConversationMessages }
