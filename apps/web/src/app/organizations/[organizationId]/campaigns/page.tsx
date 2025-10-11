import { Suspense } from "react"

import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getManyCampaigns } from "~/data/campaign/get-many-campaigns"
import { CampaignTable, CampaignTableSkeleton } from "~/features/campaign/components/campaign-table"
import { CreateCampaignButton } from "~/features/campaign/components/create-campaign"

type PageProps = Readonly<{
	params: Promise<{ organizationId: string }>
}>
const AllCampaignsPage = async ({ params }: PageProps) => {
	const { organizationId } = await params

	const campaignsPromise = getManyCampaigns(organizationId)

	return (
		<Page>
			<PageHeader className="border-border border-b">
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon name={IconName.MEGAPHONE} />
						<p className="font-bold">Campaigns</p>
					</PageHeaderGroup>
					<CreateCampaignButton />
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<Suspense fallback={<CampaignTableSkeleton />}>
					<CampaignTable campaignsPromise={campaignsPromise} />
				</Suspense>
			</PageContent>
		</Page>
	)
}

export default AllCampaignsPage
