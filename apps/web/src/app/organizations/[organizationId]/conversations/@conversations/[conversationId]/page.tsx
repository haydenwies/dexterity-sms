import { getManyContacts } from "~/data/contact/get-many-contacts"
import { getManyConversations } from "~/data/conversation/get-many-conversations"
import { AllConversationsList } from "~/features/conversation/components/all-conversations-list"

type RouteSegmentParams = Readonly<{
	params: Promise<{ organizationId: string }>
}>

const ConversationRouteSegment = async ({ params }: RouteSegmentParams) => {
	const { organizationId } = await params

	const conversationsPromise = getManyConversations(organizationId)
	const contactsPromise = getManyContacts(organizationId)

	return (
		<AllConversationsList
			className="w-[300px]"
			organizationId={organizationId}
			conversationsPromise={conversationsPromise}
			contactsPromise={contactsPromise}
		/>
	)
}

export default ConversationRouteSegment
