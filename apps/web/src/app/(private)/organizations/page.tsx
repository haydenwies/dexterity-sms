import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"

import { getAllOrganizations } from "~/actions/organization/get-all-organizations"
import { OrganizationCardList } from "~/features/organization/all-organizations-list"

const AllOrganizationsPage = () => {
	const organizationsPromise = getAllOrganizations()

	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow>
					<h1>Organizations</h1>
					<Button variant="destructive">
						<Icon name={IconName.LOG_OUT} />
						Logout
					</Button>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<OrganizationCardList organizationsPromise={organizationsPromise} />
			</PageContent>
		</Page>
	)
}

export default AllOrganizationsPage
