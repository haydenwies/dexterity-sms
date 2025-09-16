import Link from "next/link"

import { routes } from "@repo/routes"
import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Label } from "@repo/ui/components/label"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

type Props = Readonly<{
	params: Promise<{ organizationId: string }>
}>
const DashboardPage = async ({ params }: Props) => {
	const { organizationId } = await params

	return (
		<Page>
			<PageHeader className="border-border border-b">
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon name={IconName.HOME} />
						<p className="font-bold">Home</p>
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent
				disableScroll
				className="items-center justify-center"
			>
				<div className="mx-auto flex max-w-xs flex-col gap-4">
					<Label>&#40;We&apos;re working on a real dashboard...&#41;</Label>
					<Button
						asChild
						size="lg"
						variant="outline"
					>
						<Link href={routes.web.ALL_CAMPAIGNS(organizationId)}>
							<Icon name={IconName.MEGAPHONE} />
							Create Campaign
						</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
					>
						<Link href={routes.web.ALL_CONVERSATIONS(organizationId)}>
							<Icon name={IconName.MESSAGE} />
							View Messages
						</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
					>
						<Link href={routes.web.ALL_CONTACTS(organizationId)}>
							<Icon name={IconName.USERS} />
							Manage Contacts
						</Link>
					</Button>
				</div>
			</PageContent>
		</Page>
	)
}

export default DashboardPage
