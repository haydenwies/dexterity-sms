import { ColumnDef } from "@tanstack/react-table"

import { type CampaignModel } from "@repo/types/campaign"
import { Badge } from "@repo/ui/components/badge"
import { Checkbox } from "@repo/ui/components/checkbox"

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
		header: "Name"
	},
	{
		accessorKey: "body",
		enableHiding: true,
		enableSorting: true,
		header: "Body"
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
				<CampaignTableActions
					type="header"
					data={{ campaigns: campaigns }}
				/>
			)
		},
		cell: ({ row }) => {
			const campaign = row.original
			return (
				<CampaignTableActions
					type="cell"
					data={{ campaign }}
				/>
			)
		}
	}
]

export { getCampaignTableColumns }
