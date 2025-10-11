import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"
import Image from "next/image"

import { getManyOrganizations } from "~/data/organization/get-many-organizations"
import { AllOrganizationsList } from "~/features/organization/components/all-organizations-list"

const AllOrganizationsPage = () => {
	const organizationsPromise = getManyOrganizations()

	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow className="justify-around">
					<PageHeaderGroup>
						<Image
							src="/logo.svg"
							alt="Logo"
							width={36}
							height={36}
						/>
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
