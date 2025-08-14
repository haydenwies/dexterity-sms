"use client"

import Link from "next/link"
import { useState } from "react"

import { type OrganizationModel } from "@repo/types/organization"
import { Button } from "@repo/ui/components/button"
import { Card, CardAction, CardHeader, CardTitle } from "@repo/ui/components/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"

import { DeleteOrganizationDialog } from "~/features/organization/all-organizations/components/delete-dialog"
import { routes } from "~/lib/routes"

type Props = {
	className?: string
	organization: OrganizationModel
}

export const OrganizationCard = ({ organization }: Props) => {
	const [deleteOpen, setDeleteOpen] = useState(false)

	return (
		<Card
			key={organization.id}
			className="transition-shadow hover:shadow-md"
		>
			<CardHeader>
				<Link href={routes.DASHBOARD(organization.id)}>
					<CardTitle>{organization.name}</CardTitle>
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<CardAction>
							<Button
								variant="ghost"
								size="icon"
							>
								<Icon name={IconName.ELLIPSIS} />
							</Button>
						</CardAction>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							variant="destructive"
							onClick={() => setDeleteOpen(true)}
						>
							<Icon name={IconName.TRASH} />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<DeleteOrganizationDialog
				open={deleteOpen}
				setOpen={setDeleteOpen}
				organizationId={organization.id}
			/>
		</Card>
	)
}
