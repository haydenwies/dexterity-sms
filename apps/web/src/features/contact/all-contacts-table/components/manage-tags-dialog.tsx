import { type ContactModel, type ContactTagModel } from "@repo/types/contact"

type Props = {
	contacts: ContactModel[]
	contactTags: ContactTagModel[]
	open: boolean
	setOpen: (open: boolean) => void
}

const ManageContactTagsDialog = ({ contacts, contactTags, open, setOpen }: Props) => {
	return null
}

export { ManageContactTagsDialog }
