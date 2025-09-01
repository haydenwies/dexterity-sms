import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Label } from "@repo/ui/components/label"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"
import Link from "next/link"
import { routes } from "~/lib/routes"

type Props = {
	params: Promise<{ organizationId: string }>
}

const DashboardPage = async ({ params }: Props) => {
	const { organizationId } = await params

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon
							className="size-6"
							name={IconName.HOME}
						/>
						<h1>Home</h1>
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
						<Link href={routes.ALL_CAMPAIGNS(organizationId)}>
							<Icon name={IconName.MEGAPHONE} />
							Create Campaign
						</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
					>
						<Link href={routes.ALL_MESSAGES(organizationId)}>
							<Icon name={IconName.MESSAGE} />
							View Messages
						</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
					>
						<Link href={routes.ALL_CONTACTS(organizationId)}>
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
