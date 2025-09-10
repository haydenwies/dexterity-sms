import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getAllCampaigns } from "~/actions/campaign/get-all-campaigns"
import { AllCampaignsTable } from "~/features/campaign/all-campaigns-table"
import { CreateCampaignButton } from "~/features/campaign/create-campaign"

const AllCampaignsPage = () => {
	const campaignsPromise = getAllCampaigns()

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
				<AllCampaignsTable campaignsPromise={campaignsPromise} />
			</PageContent>
		</Page>
	)
}

export default AllCampaignsPage
