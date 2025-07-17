import { Button } from "@repo/ui/components/button"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { OrganizationCard } from "~/features/organization/all-organizations/components/organization-card"
import { OrganizationModel } from "~/types/organization.types"

// Mock data for demonstration - in a real app this would come from an API
const organizations: OrganizationModel[] = [
	{
		id: "1",
		name: "Acme Corporation"
	},
	{
		id: "2",
		name: "Tech Innovations Inc"
	},
	{
		id: "3",
		name: "Digital Solutions LLC"
	},
	{
		id: "4",
		name: "Creative Agency"
	}
]

const AllOrganizationsPage = () => {
	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow>
					<PageHeaderGroup type="column">
						<h1>Organizations</h1>
						<p className="text-muted-foreground">Manage and access all the organizations you belong to</p>
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{organizations.map((org) => (
						<OrganizationCard
							key={org.id}
							organization={org}
						/>
					))}
				</div>
				{organizations.length === 0 && (
					<div className="flex h-full flex-col items-center justify-center gap-6">
						<div className="space-y-2 text-center">
							<h3 className="text-lg font-semibold">No organizations found</h3>
							<p className="text-muted-foreground">You don&apos;t belong to any organizations yet.</p>
						</div>
						<Button>Create organization</Button>
					</div>
				)}
			</PageContent>
		</Page>
	)
}

export default AllOrganizationsPage
