import { getManyContacts } from "~/data/contact/get-many-contacts"
import { getConversation } from "~/data/conversation/get-conversation"
import { getManyConversationMessages } from "~/data/conversation/get-many-conversation-messages"
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
	const messagesPromise = getManyConversationMessages(organizationId, conversationId)
	const contactsPromise = getManyContacts(organizationId)

	return (
		<div className="flex h-full max-h-full flex-col overflow-hidden">
			<ConversationHeader
				className="h-16 px-6"
				conversationPromise={conversationPromise}
				contactsPromise={contactsPromise}
			/>
			<div className="min-h-0 flex-1 overflow-hidden">
				<AllMessagesList
					className="px-6 py-4"
					messagesPromise={messagesPromise}
				/>
			</div>
			<MessageInput
				className="px-6 py-4"
				params={{ organizationId, conversationId }}
			/>
		</div>
	)
}

export default ConversationPage
