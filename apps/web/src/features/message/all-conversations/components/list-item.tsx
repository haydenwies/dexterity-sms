"use client"

import { ContactModel } from "@repo/types/contact"
import { ConversationModel } from "@repo/types/message"

type AllConversationsListItemProps = {
	conversation: ConversationModel
	contacts: ContactModel[]
}
/**
 * This will display the list of all conversations (will be used as a sidebar in the chat interface)
 */
const AllConvesationsListItem = ({ conversation, contacts }: AllConversationsListItemProps) => {
	const getDisplayName = (): React.ReactNode => {
		const contact = contacts.find((contact) => contact.id === conversation.contactId)

		if (!contact) return <span>{conversation.recipient}</span>

		if (!contact.firstName && !contact.lastName) return <span>{conversation.recipient}</span>

		return (
			<span>
				{contact.firstName} <span className="font-semibold">{contact.lastName}</span>
			</span>
		)
	}

	return <div>{getDisplayName()}</div>
}

export { AllConvesationsListItem }
