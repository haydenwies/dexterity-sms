import {
	Annotated,
	AnnotatedContent,
	AnnotatedDescription,
	AnnotatedHeader,
	AnnotatedSection,
	AnnotatedTitle
} from "@repo/ui/components/annotated"
import { Card, CardContent } from "@repo/ui/components/card"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"
import { Separator } from "@repo/ui/components/separator"

import { getAllSubscriptions } from "~/actions/billing/get-all-subscriptions"
import { getBillingAccount } from "~/actions/billing/get-billing-account"
import { getOrganization } from "~/actions/organization/get-organization"
import { getSender } from "~/actions/sender/get-sender"
import { ManageBillingLinkButton, ManageSubscriptionInterface } from "~/features/billing/manage-billing"
import { UpdateOrganizationForm } from "~/features/organization/components/update-organization-form"
import { ManageSenderInterface } from "~/features/sender/manage-sender"

type Props = {
	params: Promise<{ organizationId: string }>
}

const OrganizationSettingsPage = async ({ params }: Props) => {
	const { organizationId } = await params

	const organizationPromise = getOrganization(organizationId)
	const senderPromise = getSender(organizationId)
	const allSubscriptionsPromise = getAllSubscriptions()
	const billingAccountPromise = getBillingAccount()

	return (
		<Page>
			<PageHeader className="border-border border-b">
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon name={IconName.SETTINGS} />
						<p className="font-bold">Settings</p>
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<Annotated className="mx-auto w-full max-w-4xl">
					<AnnotatedSection>
						<AnnotatedHeader>
							<AnnotatedTitle>Organization</AnnotatedTitle>
							<AnnotatedDescription>Update organization information</AnnotatedDescription>
						</AnnotatedHeader>
						<AnnotatedContent>
							<Card>
								<CardContent>
									<UpdateOrganizationForm organizationPromise={organizationPromise} />
								</CardContent>
							</Card>
						</AnnotatedContent>
					</AnnotatedSection>
					<Separator />
					<AnnotatedSection>
						<AnnotatedHeader>
							<AnnotatedTitle>Senders</AnnotatedTitle>
							<AnnotatedDescription>Manage senders for this organization</AnnotatedDescription>
						</AnnotatedHeader>
						<AnnotatedContent>
							<Card>
								<CardContent>
									<ManageSenderInterface senderPromise={senderPromise} />
								</CardContent>
							</Card>
						</AnnotatedContent>
					</AnnotatedSection>
					<Separator />
					<AnnotatedSection>
						<AnnotatedHeader>
							<AnnotatedTitle>Billing</AnnotatedTitle>
							<AnnotatedDescription>Manage payment methods and billing information</AnnotatedDescription>
						</AnnotatedHeader>
						<AnnotatedContent>
							<Card>
								<CardContent className="flex flex-col items-center gap-4">
									<ManageSubscriptionInterface
										allSubscriptionsPromise={allSubscriptionsPromise}
										billingAccountPromise={billingAccountPromise}
										className="w-full"
									/>
									<ManageBillingLinkButton />
								</CardContent>
							</Card>
						</AnnotatedContent>
					</AnnotatedSection>
				</Annotated>
			</PageContent>
		</Page>
	)
}

export default OrganizationSettingsPage
