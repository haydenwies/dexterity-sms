import { Icon, IconName } from "@dexterity-sms/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@dexterity-sms/ui/components/page"

type LayoutProps = Readonly<{
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}>

const AllMessagesLayout = async ({ children }: LayoutProps) => {
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
				{children}
			</PageContent>
		</Page>
	)
}

export default AllMessagesLayout
