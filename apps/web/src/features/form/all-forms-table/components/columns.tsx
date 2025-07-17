import { ColumnDef } from "@tanstack/react-table"

import { Form } from "~/types/form.types"

const allFormsTableColumns: ColumnDef<Form>[] = [
	{
		accessorKey: "title",
		header: "Title"
	},
	{
		accessorKey: "createdAt",
		header: "Created At"
	}
]

export { allFormsTableColumns }
