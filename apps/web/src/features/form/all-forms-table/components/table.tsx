"use client"

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/table"
import { use } from "react"

import { Form } from "~/types/form.types"
import { allFormsTableColumns } from "~/features/form/all-forms-table/components/columns"

type Props = {
	allFormsPromise: Promise<Form[]>
}
const AllFormsTable = ({ allFormsPromise }: Props) => {
	const forms = use(allFormsPromise)

	const table = useReactTable({
		data: forms,
		columns: allFormsTableColumns,
		getCoreRowModel: getCoreRowModel()
	})

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
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
								colSpan={allFormsTableColumns.length}
								className="h-24 text-center"
							>
								No results
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export { AllFormsTable }
