import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { getConversation } from "~/actions/conversation/get-conversation"
import { getConversationMessages } from "~/actions/conversation/get-conversation-messages"
import {
	AllMessagesList,
	ConversationHeader,
	MessageInput
} from "~/features/conversation/components/conversation-interface"

type PageProps = Readonly<{
	params: Promise<{ organizationId: string; conversationId: string }>
}>
const ConversationPage = async ({ params }: PageProps) => {
	const { organizationId, conversationId } = await params

	const conversationPromise = getConversation(organizationId, conversationId)
	const messagesPromise = getConversationMessages(organizationId, conversationId)
	const contactsPromise = getAllContacts(organizationId)

	return (
		<div className="flex h-full flex-col">
			<ConversationHeader
				conversationPromise={conversationPromise}
				contactsPromise={contactsPromise}
			/>
			<AllMessagesList messagesPromise={messagesPromise} />
			<MessageInput />
		</div>
	)
}

export default ConversationPage
