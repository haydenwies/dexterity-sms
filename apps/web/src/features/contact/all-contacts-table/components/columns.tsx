import { type ColumnDef } from "@tanstack/react-table"

import { type ContactModel } from "@repo/types/contact"
import { Badge } from "@repo/ui/components/badge"
import { Checkbox } from "@repo/ui/components/checkbox"

import { AllContactsTableCellActions } from "~/features/contact/all-contacts-table/components/actions-cell"
import { AllContactsTableHeaderActions } from "~/features/contact/all-contacts-table/components/actions-header"

const getAllContactsColumns = (): ColumnDef<ContactModel>[] => {
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
			accessorKey: "tags",
			header: "Tags",
			cell: ({ row }) => {
				const contact = row.original
				return contact.tags?.map((tag) => <Badge key={tag.id}>{tag.name}</Badge>)
			}
		},
		{
			id: "actions",
			header: ({ table }) => {
				const contacts = table.getSelectedRowModel().rows.map((row) => row.original)
				return <AllContactsTableHeaderActions contacts={contacts} />
			},
			cell: ({ row }) => {
				const contact = row.original
				return <AllContactsTableCellActions contact={contact} />
			}
		}
	]
}

export { getAllContactsColumns }
