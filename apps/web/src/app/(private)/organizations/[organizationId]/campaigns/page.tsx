import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"

import { getAllCampaigns } from "~/actions/campaign/get-all-campaigns"
import { AllCampaignsTable } from "~/features/campaign/all-campaigns-table"
import { CreateCampaignButton } from "~/features/campaign/create-campaign"

const AllCampaignsPage = () => {
	const campaignsPromise = getAllCampaigns()

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<h1>Campaigns</h1>
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
