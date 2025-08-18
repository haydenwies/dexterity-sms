"use client"

import { useState } from "react"

import { CampaignModel } from "@repo/types/campaign"
import { Button } from "@repo/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"

import { AllCampaignsTableDeleteDialog } from "~/features/campaign/all-campaigns-table/components/delete-dialog"

type Props =
	| { type: "header"; data: { campaigns: CampaignModel[] } }
	| { type: "cell"; data: { campaign: CampaignModel } }

const AllCampaignsTableActions = ({ type, data }: Props) => {
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
				<DropdownMenuItem
					onClick={() => setDeleteOpen(true)}
					variant="destructive"
				>
					<Icon name={IconName.TRASH} /> Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
			<AllCampaignsTableDeleteDialog
				campaigns={type === "header" ? data.campaigns : [data.campaign]}
				open={deleteOpen}
				setOpen={setDeleteOpen}
			/>
		</DropdownMenu>
	)
}

export { AllCampaignsTableActions }
