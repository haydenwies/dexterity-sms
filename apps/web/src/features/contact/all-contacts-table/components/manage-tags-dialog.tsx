import { type ContactModel, type ContactTagModel } from "@repo/types/contact"

type Props = {
	contacts: ContactModel[]
	contactTags: ContactTagModel[]
}

const ManageContactTagsDialog = ({ contacts, contactTags }: Props) => {
	return <div>AllContactsTableManageTagsDialog</div>
}

export { ManageContactTagsDialog }
