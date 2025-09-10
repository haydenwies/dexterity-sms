import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { getConversation } from "~/actions/message/get-conversation"
import { getConversationMessages } from "~/actions/message/get-conversation-messages"
import { AllMessagesList } from "~/features/message/conversation-interface/components/all-messages-list"
import { ConversationHeader } from "~/features/message/conversation-interface/components/conversation-header"
import { MessageInput } from "~/features/message/conversation-interface/components/message-input"

type ConversationPageProps = Readonly<{
	params: Promise<{ organizationId: string; conversationId: string }>
}>
const ConversationPage = async ({ params }: ConversationPageProps) => {
	const { organizationId, conversationId } = await params

	const conversationPromise = getConversation(conversationId)
	const messagesPromise = getConversationMessages(conversationId)
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
