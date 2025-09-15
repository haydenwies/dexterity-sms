"use client"

import Link from "next/link"
import { use, useState } from "react"

import { routes } from "@repo/routes"
import { type OrganizationModel } from "@repo/types/organization"
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar"
import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { CreateOrganizationDialog } from "~/features/organization/components/create-organization-dialog"

// #region OrganizationListItem

type AllOrganizationsListItemProps = {
	organization: OrganizationModel
}
const AllOrganizationsListItem = ({ organization }: AllOrganizationsListItemProps) => {
	return (
		<Link href={routes.web.ORGANIZATION(organization.id)}>
			<div className="border-border hover:bg-muted flex items-center justify-between rounded-md border p-4">
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarFallback>{organization.name[0]}</AvatarFallback>
					</Avatar>
					<p className="font-medium">{organization.name}</p>
				</div>
				<Icon name={IconName.CHEVRON_RIGHT} />
			</div>
		</Link>
	)
}

// #region AllOrganizationsList

type AllOrganizationsListProps = {
	allOrganizationsPromise: Promise<OrganizationModel[]>
	className?: string
}
const AllOrganizationsList = ({ allOrganizationsPromise, className }: AllOrganizationsListProps) => {
	const allOrganizations = use(allOrganizationsPromise)

	const [createOrganizationOpen, setCreateOrganizationOpen] = useState<boolean>(false)

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<div className="grid grid-cols-[1fr_auto] gap-2">
				<Input
					disabled={allOrganizations.length === 0}
					placeholder="Search organizations..."
				/>
				<Button onClick={() => setCreateOrganizationOpen(true)}>
					<Icon name={IconName.PLUS} />
					Add organization
				</Button>
			</div>
			{allOrganizations.map((organization) => (
				<AllOrganizationsListItem
					key={organization.id}
					organization={organization}
				/>
			))}
			{allOrganizations.length === 0 && (
				<div className="border-border flex flex-col items-center justify-center gap-6 rounded-md border px-8 py-12">
					<div className="border-border text-muted-foreground flex size-12 items-center justify-center rounded-md border">
						<Icon
							className="size-6"
							name={IconName.BUILDING}
						/>
					</div>
					<span className="text-center">
						<p className="font-bold">No organizations found</p>
						<p className="text-muted-foreground">Create an organization to get started</p>
					</span>
				</div>
			)}
			<CreateOrganizationDialog
				open={createOrganizationOpen}
				setOpen={setCreateOrganizationOpen}
			/>
		</div>
	)
}

export { AllOrganizationsList }
