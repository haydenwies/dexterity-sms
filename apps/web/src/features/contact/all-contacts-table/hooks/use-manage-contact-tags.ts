import { useMemo, useState } from "react"

import { type ContactModel, type ContactTagModel } from "@repo/types/contact"

import { createTag } from "~/actions/contact/create-tag"
import { setTagsOnContact } from "~/actions/contact/set-tags-on-contact"
import { getRandomTagColor } from "~/lib/tags"

const getSelectedTags = (contact: ContactModel, tags: ContactTagModel[]): ContactTagModel[] => {
	return tags.filter((tag) => contact.tagIds?.includes(tag.id))
}

const getSelectableTags = (selectedTags: ContactTagModel[], allTags: ContactTagModel[]): ContactTagModel[] => {
	const selectedTagIds = new Set(selectedTags.map((tag) => tag.id))
	return allTags.filter((tag) => !selectedTagIds.has(tag.id))
}

type Props = {
	contact: ContactModel
	contactTags: ContactTagModel[]
}

const useManageContactTags = ({ contact, contactTags }: Props) => {
	const [selectedTags, setSelectedTags] = useState<ContactTagModel[]>(getSelectedTags(contact, contactTags))

	const selectableTags = useMemo(() => getSelectableTags(selectedTags, contactTags), [contactTags, selectedTags])

	const handleAddTag = (tag: ContactTagModel): void => {
		setSelectedTags([...selectedTags, tag])
	}

	const handleRemoveTag = (tag?: ContactTagModel): void => {
		if (!tag) setSelectedTags((prev) => [...prev.slice(0, -1)])
		else setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
	}

	const handleCreateTag = async (name: string): Promise<void> => {
		const res = await createTag({ name, color: getRandomTagColor() })
		if (!res.success) return

		handleAddTag(res.data)
	}

	const handleSubmit = async (): Promise<void> => {
		const res = await setTagsOnContact({
			contactId: contact.id,
			tagIds: selectedTags.map((tag) => tag.id)
		})

		if (!res.success) return
	}

	return {
		selectedTags,
		selectableTags,
		handleAddTag,
		handleRemoveTag,
		handleCreateTag,
		handleSubmit
	}
}

export { useManageContactTags }
