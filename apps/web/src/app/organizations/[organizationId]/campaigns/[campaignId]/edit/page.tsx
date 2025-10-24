import Link from "next/link"

import { routes } from "@dexterity-sms/routes"
import { Button } from "@dexterity-sms/ui/components/button"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@dexterity-sms/ui/components/page"

import { CampaignStatus } from "@dexterity-sms/core/campaign"
import { redirect } from "next/navigation"
import { getCampaign } from "~/data/campaign/get-campaign"
import { SendCampaignButton } from "~/features/campaign/components/send-campaign"
import { SendTestCampaignButton } from "~/features/campaign/components/send-test-campaign"
import {
	UpdateCampaignInterface,
	UpdateCampaignProvider,
	UpdateCampaignSaveState
} from "~/features/campaign/components/update-campaign"

type Props = Readonly<{
	params: Promise<{ organizationId: string; campaignId: string }>
}>
const EditCampaignPage = async ({ params }: Props) => {
	const { organizationId, campaignId } = await params

	const campaign = await getCampaign(organizationId, campaignId)

	if (campaign.status !== CampaignStatus.DRAFT) redirect(routes.web.ALL_CAMPAIGNS(organizationId))

	return (
		<UpdateCampaignProvider
			organizationId={organizationId}
			campaign={campaign}
		>
			<Page>
				<PageHeader className="border-border border-b">
					<PageHeaderRow>
						<PageHeaderGroup>
							<Button
								size="icon"
								variant="link"
							>
								<Link href={routes.web.ALL_CAMPAIGNS(organizationId)}>
									<Icon name={IconName.ARROW_LEFT} />
								</Link>
							</Button>
							<p className="font-bold">Edit Campaign</p>
						</PageHeaderGroup>
						<PageHeaderGroup>
							<UpdateCampaignSaveState className="pr-4" />
							<SendTestCampaignButton />
							<SendCampaignButton />
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
