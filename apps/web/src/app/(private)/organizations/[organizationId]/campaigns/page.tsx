import { Page, PageContent, PageHeader } from "@repo/ui/components/page"

import { getAllCampaigns } from "~/actions/campaign/get-all-campaigns"
import { AllCampaignsTable } from "~/features/campaign/all-campaigns-table"

const AllCampaignsPage = () => {
	const campaignsPromise = getAllCampaigns()

	return (
		<Page>
			<PageHeader>
				<h1>All Campaigns</h1>
			</PageHeader>
			<PageContent>
				<AllCampaignsTable campaignsPromise={campaignsPromise} />
			</PageContent>
		</Page>
	)
}

export default AllCampaignsPage
