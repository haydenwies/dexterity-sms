import { getManyContacts } from "~/data/contact/get-many-contacts"
import { getManyConversations } from "~/data/conversation/get-many-conversations"
import { AllConversationsList } from "~/features/conversation/components/all-conversations-list"

type PageProps = Readonly<{
	params: Promise<{ organizationId: string }>
}>

const AllMessagesPage = async ({ params }: PageProps) => {
	const { organizationId } = await params

	const conversationsPromise = getManyConversations(organizationId)
	const contactsPromise = getManyContacts(organizationId)

	return (
		<>
			<AllConversationsList
				className="w-[300px]"
				params={{ organizationId }}
				conversationsPromise={conversationsPromise}
				contactsPromise={contactsPromise}
			/>
			<div className="flex h-full w-full flex-col items-center justify-center">
				<p className="text-muted-foreground">No conversation selected</p>
			</div>
		</>
	)
}

export default AllMessagesPage
