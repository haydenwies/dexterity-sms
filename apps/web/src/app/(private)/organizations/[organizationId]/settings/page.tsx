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
import { Skeleton } from "@repo/ui/components/skeleton"
import { Suspense } from "react"

import { getSubscription } from "~/data/billing/get-subscription"
import { getOrganization } from "~/data/organization/get-organization"
import { getSender } from "~/data/sender/get-sender"
import { BillingPortalButton } from "~/features/billing/components/billing-portal"
import { SubscriptionCard, SubscriptionCardSkeleton } from "~/features/billing/components/subscription-card"
import { UpdateOrganizationForm } from "~/features/organization/components/update-organization-form"
import { ManageSenderInterface } from "~/features/sender/components/manage-sender"

type PageProps = Readonly<{
	params: Promise<{ organizationId: string }>
}>
const OrganizationSettingsPage = async ({ params }: PageProps) => {
	const { organizationId } = await params

	const organizationPromise = getOrganization(organizationId)
	const senderPromise = getSender(organizationId)
	const subscriptionPromise = getSubscription(organizationId)

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
									<Suspense
										fallback={
											<div className="space-y-4">
												<Skeleton className="h-10 w-full" />
												<Skeleton className="h-10 w-full" />
											</div>
										}
									>
										<UpdateOrganizationForm organizationPromise={organizationPromise} />
									</Suspense>
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
									<Suspense fallback={<Skeleton className="h-10 w-full" />}>
										<ManageSenderInterface senderPromise={senderPromise} />
									</Suspense>
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
									<Suspense fallback={<SubscriptionCardSkeleton />}>
										<SubscriptionCard
											className="w-full"
											subscriptionPromise={subscriptionPromise}
										/>
									</Suspense>
									<BillingPortalButton />
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
