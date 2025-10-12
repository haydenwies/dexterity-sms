import { getManyContacts } from "~/data/contact/get-many-contacts"
import { getManyConversations } from "~/data/conversation/get-many-conversations"
import { AllConversationsList } from "~/features/conversation/components/all-conversations-list"

type ConversationsRouteSegmentParams = Readonly<{
	params: Promise<{ organizationId: string; conversationId: string }>
}>

const ConversationsRouteSegment = async ({ params }: ConversationsRouteSegmentParams) => {
	const { organizationId, conversationId } = await params

	const conversationsPromise = getManyConversations(organizationId, { from: "conversations/[id]" })
	const contactsPromise = getManyContacts(organizationId, { from: "conversations/[id]" })

	return (
		<AllConversationsList
			className="w-[300px]"
			params={{ organizationId, conversationId }}
			conversationsPromise={conversationsPromise}
			contactsPromise={contactsPromise}
		/>
	)
}

export default ConversationsRouteSegment
