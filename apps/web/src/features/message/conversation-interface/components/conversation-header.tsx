"use client"

import { type ContactModel } from "@repo/types/contact"
import { type MessageModel } from "@repo/types/message"

type Props = {
	conversationId: string
	messages: MessageModel[]
	contacts: ContactModel[]
}

/**
 * This will display the header of a conversation with the contact name, etc
 */
const ChatHeader = ({ conversationId, messages, contacts }: Props) => {
	return <></>
}

export { ChatHeader }
