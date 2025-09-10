import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getAllOrganizations } from "~/actions/organization/get-all-organizations"
import { AllOrganizationsList } from "~/features/organization/components/all-organizations-list"

const AllOrganizationsPage = () => {
	const organizationsPromise = getAllOrganizations()

	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow className="justify-around">
					<PageHeaderGroup>
						<div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
							<Icon name={IconName.MEGAPHONE} />
						</div>
						<p className="font-bold">Name Pending</p>
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<div className="mx-auto w-full max-w-md space-y-6 pt-12">
					<div className="text-center">
						<h1>Organizations</h1>
						<p className="text-muted-foreground">Jump into an existing organization or add a new one.</p>
					</div>
					<AllOrganizationsList
						allOrganizationsPromise={organizationsPromise}
						className=""
					/>
				</div>
			</PageContent>
		</Page>
	)
}

export default AllOrganizationsPage
