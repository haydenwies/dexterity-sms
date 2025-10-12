import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getManyContacts } from "~/data/contact/get-many-contacts"
import { getManyConversations } from "~/data/conversation/get-many-conversations"
import { AllConversationsList } from "~/features/conversation/components/all-conversations-list"

export const dynamic = "force-dynamic"

type LayoutProps = Readonly<{
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}>

const AllMessagesLayout = async ({ children, params }: LayoutProps) => {
	const { organizationId } = await params

	const conversationsPromise = getManyConversations(organizationId)
	const contactsPromise = getManyContacts(organizationId)

	return (
		<Page>
			<PageHeader className="border-border border-b">
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon name={IconName.MESSAGE} />
						<p className="font-bold">Conversations</p>
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
