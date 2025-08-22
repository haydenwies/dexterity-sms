import Link from "next/link"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getCampaign } from "~/actions/campaign/get-campaign"
import { SendCampaignButton } from "~/features/campaign/send-campaign"
import { SendTestCampaignButton } from "~/features/campaign/send-test-campaign"
import {
	UpdateCampaignInterface,
	UpdateCampaignProvider,
	UpdateCampaignSaveState
} from "~/features/campaign/update-campaign"
import { routes } from "~/lib/routes"

const EditCampaignPage = async ({ params }: { params: Promise<{ organizationId: string; campaignId: string }> }) => {
	const { organizationId, campaignId } = await params

	const campaign = await getCampaign(campaignId)

	return (
		<UpdateCampaignProvider campaign={campaign}>
			<Page>
				<PageHeader>
					<PageHeaderRow>
						<PageHeaderGroup>
							<Button
								size="icon"
								variant="link"
							>
								<Link href={routes.CAMPAIGN(organizationId, campaignId)}>
									<Icon name={IconName.ARROW_LEFT} />
								</Link>
							</Button>
							<h1>Edit Campaign</h1>
						</PageHeaderGroup>
						<PageHeaderGroup>
							<UpdateCampaignSaveState className="pr-4" />
							<SendTestCampaignButton campaignId={campaignId} />
							<SendCampaignButton campaignId={campaignId} />
						</PageHeaderGroup>
					</PageHeaderRow>
				</PageHeader>
				<PageContent
					className="items-center"
					disableScroll
				>
					<div className="mx-auto w-full max-w-xl">
						<UpdateCampaignInterface />
					</div>
				</PageContent>
			</Page>
		</UpdateCampaignProvider>
	)
}

export default EditCampaignPage
