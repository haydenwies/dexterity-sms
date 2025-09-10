import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { getAllConversations } from "~/actions/message/get-all-conversations"
import { AllConversationsList } from "~/features/message/all-conversations"
import { NewMessageButton } from "~/features/message/new-message"

type Props = Readonly<{
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}>

const AllMessagesLayout = async ({ children, params }: Props) => {
	const { organizationId } = await params

	const conversationsPromise = getAllConversations()
	const contactsPromise = getAllContacts()

	return (
		<Page>
			<PageHeader className="border-border border-b">
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon name={IconName.MESSAGE} />
						<p className="font-bold">Messages</p>
					</PageHeaderGroup>
					<PageHeaderGroup>
						<NewMessageButton />
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent
				className="grid grid-cols-[auto_1fr] p-0"
				disableScroll
			>
				<AllConversationsList
					className="w-[300px]"
					organizationId={organizationId}
					conversationsPromise={conversationsPromise}
					contactsPromise={contactsPromise}
				/>
				{children}
			</PageContent>
		</Page>
	)
}

export default AllMessagesLayout
