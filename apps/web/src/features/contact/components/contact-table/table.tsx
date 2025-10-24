"use client"

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
	type RowSelectionState
} from "@tanstack/react-table"
import { use, useState } from "react"

import { type ContactModel } from "@dexterity-sms/core/contact"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@dexterity-sms/ui/components/table"

import { Input } from "@dexterity-sms/ui/components/input"
import { getContactTableColumns } from "~/features/contact/components/contact-table/columns"

type ContactTableProps = {
	contactsPromise: Promise<ContactModel[]>
}
const ContactTable = ({ contactsPromise }: ContactTableProps) => {
	const data = use(contactsPromise)
	const columns = getContactTableColumns()

	const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
	const [globalFilter, setGlobalFilter] = useState<string>("")

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			rowSelection,
			globalFilter
		}
	})

	return (
		<div className="space-y-4">
			<Input
				className="w-full max-w-sm"
				onChange={(e) => table.setGlobalFilter(e.target.value)}
				placeholder="Search..."
			/>
			<div className="rounded-md border">
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
									className="text-muted-foreground h-24 text-center"
								>
									No results
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

export { ContactTable }
