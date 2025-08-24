"use client"

import { use } from "react"

import { ContactModel } from "@repo/types/contact"
import { ConversationModel } from "@repo/types/message"

import { AllConvesationsListItem } from "~/features/message/all-conversations/components/list-item"

type AllConversationsListProps = {
	conversationsPromise: Promise<ConversationModel[]>
	contactsPromise: Promise<ContactModel[]>
}
/**
 * This will display a conversation list item
 */
const AllConversationsList = ({ conversationsPromise, contactsPromise }: AllConversationsListProps) => {
	const conversations = use(conversationsPromise)
	const contacts = use(contactsPromise)

	return (
		<div>
			{conversations.map((conversation) => (
				<AllConvesationsListItem
					key={conversation.id}
					conversation={conversation}
					contacts={contacts}
				/>
			))}
		</div>
	)
}

export { AllConversationsList }
