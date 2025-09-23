import { type ColumnDef } from "@tanstack/react-table"

import { type ContactModel } from "@repo/types/contact"
import { Checkbox } from "@repo/ui/components/checkbox"

import { formatDate } from "date-fns"
import { ContactTableActions } from "~/features/contact/components/contact-table/actions"

const getContactTableColumns = (): ColumnDef<ContactModel>[] => {
	return [
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
			id: "name",
			accessorFn: (row) => `${row.firstName} ${row.lastName}`,
			header: "Name",
			cell: ({ row }) => {
				const contact = row.original

				return (
					<span>
						{contact.firstName} <span className="font-semibold">{contact.lastName}</span>
						<p className="text-muted-foreground text-xs">
							Last updated {formatDate(contact.updatedAt, "MMM d, yyyy")}
						</p>
					</span>
				)
			}
		},
		{
			header: "Email",
			accessorKey: "email"
		},

		{
			header: "Phone",
			accessorKey: "phone"
		},
		{
			id: "actions",
			header: ({ table }) => {
				const contacts = table.getSelectedRowModel().rows.map((row) => row.original)

				return (
					<div className="flex flex-1 justify-end">
						<ContactTableActions
							type="header"
							data={{ contacts }}
						/>
					</div>
				)
			},
			cell: ({ row }) => {
				const contact = row.original

				return (
					<div className="flex flex-1 justify-end">
						<ContactTableActions
							type="cell"
							data={{ contact }}
						/>
					</div>
				)
			}
		}
	]
}

export { getContactTableColumns }
