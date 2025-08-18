"use client"

import { flexRender, getCoreRowModel, RowSelectionState, useReactTable } from "@tanstack/react-table"
import { use, useState } from "react"

import { CampaignModel } from "@repo/types/campaign"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/table"

import { getAllCampaignsTableColumns } from "~/features/campaign/all-campaigns-table/components/columns"

type Props = {
	campaignsPromise: Promise<CampaignModel[]>
}

const AllCampaignsTable = ({ campaignsPromise }: Props) => {
	const data = use(campaignsPromise)
	const columns = getAllCampaignsTableColumns()

	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection
		}
	})

	return (
		<div className="overflow-hidden rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export { AllCampaignsTable }
