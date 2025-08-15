import { ContactModel, ContactTagModel } from "@repo/types/contact"
import { useMemo, useState } from "react"

type Props = {
	contact: ContactModel
	contactTags: ContactTagModel[]
}

const useManageContactTags = ({ contact, contactTags }: Props) => {
	const [selectedTags, setSelectedTags] = useState<ContactTagModel[]>(
		contactTags.filter((tag) => contact.tagIds?.includes(tag.id))
	)

	const selectableTags = useMemo(() => {
		const selectedTagIds = new Set(selectedTags.map((tag) => tag.id))
		return contactTags.filter((tag) => !selectedTagIds.has(tag.id))
	}, [contactTags, selectedTags])

	const handleAddTag = (tag: ContactTagModel) => {
		console.log("here")
		setSelectedTags([...selectedTags, tag])
	}

	const handleRemoveTag = (tag?: ContactTagModel) => {
		if (!tag) setSelectedTags((prev) => [...prev.slice(0, -1)])
		else setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
	}

	const handleCreateTag = (name: string) => {
		console.log(name)
	}

	return {
		selectedTags,
		selectableTags,
		handleAddTag,
		handleRemoveTag,
		handleCreateTag
	}
}

export { useManageContactTags }
