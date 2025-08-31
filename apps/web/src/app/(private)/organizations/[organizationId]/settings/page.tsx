import {
	Annotated,
	AnnotatedContent,
	AnnotatedDescription,
	AnnotatedHeader,
	AnnotatedSection,
	AnnotatedTitle
} from "@repo/ui/components/annotated"
import { Card, CardContent } from "@repo/ui/components/card"
import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"
import { Separator } from "@repo/ui/components/separator"

import { getOrganization } from "~/actions/organization/get-organization"
import { getSender } from "~/actions/sender/get-sender"
import { UpdateOrganizationForm } from "~/features/organization/organization-settings/components/form"
import { ManageSenderInterface } from "~/features/sender/manage-sender"

type Props = {
	params: Promise<{ organizationId: string }>
}

const OrganizationSettingsPage = async ({ params }: Props) => {
	const { organizationId } = await params

	const organizationPromise = getOrganization(organizationId)
	const senderPromise = getSender()

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<h1>Settings</h1>
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
								<CardContent></CardContent>
							</Card>
						</AnnotatedContent>
					</AnnotatedSection>
				</Annotated>
			</PageContent>
		</Page>
	)
}

export default OrganizationSettingsPage
