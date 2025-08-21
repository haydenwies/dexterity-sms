import { Page, PageContent } from "@repo/ui/components/page"

import { getCampaign } from "~/actions/campaign/get-campaign"
import { SendCampaignButton } from "~/features/campaign/send-campaign"
import { SendTestCampaignButton } from "~/features/campaign/send-test-campaign"
import { UpdateCampaignInterface } from "~/features/campaign/update-campaign/components/interface"

const EditCampaignPage = async ({ params }: { params: Promise<{ organizationId: string; campaignId: string }> }) => {
	const { campaignId } = await params

	const campaign = await getCampaign(campaignId)

	return (
		<Page>
			<PageContent>
				<UpdateCampaignInterface campaign={campaign} />
				<div className="mt-6 flex flex-col gap-4">
					<SendTestCampaignButton campaignId={campaignId} />
					<SendCampaignButton />
				</div>
			</PageContent>
		</Page>
	)
}

export default EditCampaignPage
