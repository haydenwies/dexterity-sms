import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"

import { getOrganization } from "~/actions/organization/get-organization"
import { UpdateOrganizationForm } from "~/features/organization/organization-settings"

type Props = {
	params: Promise<{ organizationId: string }>
}

const OrganizationPage = async ({ params }: Props) => {
	const { organizationId } = await params

	const organizationPromise = getOrganization(organizationId)

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<h1>Organization</h1>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<UpdateOrganizationForm organizationPromise={organizationPromise} />
			</PageContent>
		</Page>
	)
}

export default OrganizationPage
