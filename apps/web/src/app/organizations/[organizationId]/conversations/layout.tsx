import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

type LayoutProps = Readonly<{
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
	conversations: React.ReactNode
}>

const AllMessagesLayout = async ({ children, params, conversations }: LayoutProps) => {
	// const { organizationId } = await params

	// const conversationsPromise = getManyConversations(organizationId)
	// const contactsPromise = getManyContacts(organizationId)

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
				{/* <AllConversationsList
					className="w-[300px]"
					organizationId={organizationId}
					conversationsPromise={conversationsPromise}
					contactsPromise={contactsPromise}
				/> */}
				{conversations}
				{children}
			</PageContent>
		</Page>
	)
}

export default AllMessagesLayout
