import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { getAllConversations } from "~/actions/conversation/get-all-conversations"
import { AllConversationsList } from "~/features/conversation/components/all-conversations-list"
import { NewConversationButton } from "~/features/conversation/components/new-conversation"

type LayoutProps = Readonly<{
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}>
const AllMessagesLayout = async ({ children, params }: LayoutProps) => {
	const { organizationId } = await params

	const conversationsPromise = getAllConversations()
	const contactsPromise = getAllContacts(organizationId)

	return (
		<Page>
			<PageHeader className="border-border border-b">
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon name={IconName.MESSAGE} />
						<p className="font-bold">Messages</p>
					</PageHeaderGroup>
					<PageHeaderGroup>
						<NewConversationButton />
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
