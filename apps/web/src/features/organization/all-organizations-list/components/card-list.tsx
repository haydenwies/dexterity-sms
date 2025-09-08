import { use } from "react"

import { type OrganizationModel } from "@repo/types/organization"
import { Button } from "@repo/ui/components/button"

import { OrganizationCard } from "~/features/organization/all-organizations-list/components/card"

type OrganizationCardListProps = {
	organizationsPromise: Promise<OrganizationModel[]>
}

const OrganizationCardList = ({ organizationsPromise }: OrganizationCardListProps) => {
	const organizations = use(organizationsPromise)

	if (organizations.length === 0)
		return (
			<div className="flex h-full flex-col items-center justify-center gap-6">
				<div className="space-y-2 text-center">
					<h3 className="text-lg font-semibold">No organizations found</h3>
					<p className="text-muted-foreground">You don&apos;t belong to any organizations yet.</p>
				</div>
				<Button>Create organization</Button>
			</div>
		)
	else
		return (
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{organizations.map((org) => (
					<OrganizationCard
						key={org.id}
						organization={org}
					/>
				))}
			</div>
		)
}

export { OrganizationCardList }
