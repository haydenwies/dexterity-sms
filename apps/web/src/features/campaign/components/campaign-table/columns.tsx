import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import Link from "next/link"

import { CampaignStatus, type CampaignModel } from "@dexterity-sms/core/campaign"
import { routes } from "@dexterity-sms/routes"
import { Badge } from "@dexterity-sms/ui/components/badge"
import { Checkbox } from "@dexterity-sms/ui/components/checkbox"

import { CampaignTableActions } from "~/features/campaign/components/campaign-table/actions"

const getCampaignTableColumns = (): ColumnDef<CampaignModel>[] => [
	{
		id: "select",
		enableHiding: false,
		enableSorting: false,
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		)
	},
	{
		accessorKey: "name",
		enableHiding: true,
		enableSorting: true,
		header: "Name",
		cell: ({ row }) => {
			const campaign = row.original

			if (campaign.status === CampaignStatus.DRAFT)
				return (
					<Link href={routes.web.UPDATE_CAMPAIGN(campaign.organizationId, campaign.id)}>
						<p className="underline">{campaign.name}</p>
						<p className="text-muted-foreground text-xs">
							Last updated {formatDate(campaign.updatedAt, "MMM d, yyyy")}
						</p>
					</Link>
				)

			return (
				<span>
					<p>{campaign.name}</p>
					<p className="text-muted-foreground text-xs">
						Last updated {formatDate(campaign.updatedAt, "MMM d, yyyy")}
					</p>
				</span>
			)
		}
	},
	{
		accessorKey: "body",
		enableHiding: true,
		enableSorting: true,
		header: "Body",
		cell: ({ row }) => {
			const campaign = row.original

			if (!campaign.body) return <p className="text-muted-foreground">--</p>

			return <p className="wrap-break-words max-w-lg whitespace-normal">{campaign.body}</p>
		}
	},
	{
		accessorKey: "status",
		enableHiding: true,
		enableSorting: true,
		header: "Status",
		cell: ({ row }) => <Badge>{row.original.status}</Badge>
	},
	{
		id: "actions",
		enableHiding: false,
		enableSorting: false,
		header: ({ table }) => {
			const campaigns = table.getSelectedRowModel().rows.map((row) => row.original)

			return (
				<div className="flex flex-1 justify-end">
					<CampaignTableActions
						type="header"
						data={{ campaigns: campaigns }}
					/>
				</div>
			)
		},
		cell: ({ row }) => {
			const campaign = row.original

			return (
				<div className="flex flex-1 justify-end">
					<CampaignTableActions
						type="cell"
						data={{ campaign }}
					/>
				</div>
			)
		}
	}
]

export { getCampaignTableColumns }
