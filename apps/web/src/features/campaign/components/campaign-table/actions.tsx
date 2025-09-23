"use client"

import { useState } from "react"

import { CampaignModel, CampaignStatus } from "@repo/types/campaign"
import { Button } from "@repo/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"

import { routes } from "@repo/routes"
import Link from "next/link"
import { CampaignTableDeleteDialog } from "~/features/campaign/components/campaign-table/delete-dialog"

type CampaignTableActionsProps =
	| { type: "header"; data: { campaigns: CampaignModel[] } }
	| { type: "cell"; data: { campaign: CampaignModel } }
const CampaignTableActions = ({ type, data }: CampaignTableActionsProps) => {
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					disabled={type === "header" && data.campaigns.length === 0}
					size="icon"
					variant="ghost"
				>
					<Icon name={IconName.ELLIPSIS} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{type === "cell" && data.campaign.status === CampaignStatus.DRAFT && (
					<DropdownMenuItem asChild>
						<Link href={routes.web.UPDATE_CAMPAIGN(data.campaign.organizationId, data.campaign.id)}>
							<Icon name={IconName.EDIT} /> Edit
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator className="first:hidden" />
				<DropdownMenuItem
					onClick={() => setDeleteOpen(true)}
					variant="destructive"
				>
					<Icon name={IconName.TRASH} /> Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
			<CampaignTableDeleteDialog
				campaigns={type === "header" ? data.campaigns : [data.campaign]}
				open={deleteOpen}
				setOpen={setDeleteOpen}
			/>
		</DropdownMenu>
	)
}

export { CampaignTableActions }
