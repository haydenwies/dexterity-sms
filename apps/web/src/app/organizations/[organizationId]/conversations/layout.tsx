import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

type LayoutProps = Readonly<{
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
	conversations: React.ReactNode // Parallel route
}>

const AllMessagesLayout = async ({ children, conversations }: LayoutProps) => {
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
				{conversations}
				{children}
			</PageContent>
		</Page>
	)
}

export default AllMessagesLayout
