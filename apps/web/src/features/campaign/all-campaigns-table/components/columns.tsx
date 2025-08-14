import { ColumnDef } from "@tanstack/react-table"

import { type CampaignModel } from "@repo/types/campaign"

const getAllCampaignsTableColumns = (): ColumnDef<CampaignModel>[] => [
	{
		accessorKey: "name",
		header: "Name"
	},
	{
		accessorKey: "status",
		header: "Status"
	},
	{
		accessorKey: "createdAt",
		header: "Created At"
	}
]

export { getAllCampaignsTableColumns }
