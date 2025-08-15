import { type ColumnDef } from "@tanstack/react-table"

import { type ContactModel, type ContactTagModel } from "@repo/types/contact"
import { Checkbox } from "@repo/ui/components/checkbox"

import { Badge } from "@repo/ui/components/badge"
import { AllContactsTableActions } from "~/features/contact/all-contacts-table/components/actions"

type Props = {
	contactTags: ContactTagModel[]
}

const getAllContactsColumns = ({ contactTags }: Props): ColumnDef<ContactModel>[] => {
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
			accessorKey: "tagIds",
			header: "Tags",
			cell: ({ row }) => {
				const contact = row.original
				const tags = contactTags.filter((tag) => contact.tagIds?.includes(tag.id))
				return (
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<Badge
								className="text-foreground"
								key={tag.id}
								style={{ backgroundColor: `${tag.color}40` }}
							>
								<div
									style={{ backgroundColor: tag.color }}
									className="size-2 rounded-full"
								/>
								{tag.name}
							</Badge>
						))}
					</div>
				)
			}
		},
		{
			id: "actions",
			header: ({ table }) => {
				const contacts = table.getSelectedRowModel().rows.map((row) => row.original)
				return (
					<AllContactsTableActions
						type="header"
						data={{ contacts, contactTags }}
					/>
				)
			},
			cell: ({ row }) => {
				const contact = row.original
				return (
					<AllContactsTableActions
						type="cell"
						data={{ contact, contactTags }}
					/>
				)
			}
		}
	]
}

export { getAllContactsColumns }
