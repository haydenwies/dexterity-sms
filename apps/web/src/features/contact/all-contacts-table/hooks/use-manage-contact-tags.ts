import { useMemo, useState } from "react"

import { type ContactModel, type TagModel } from "@repo/types/contact"

import { createTag } from "~/actions/contact/create-tag"
import { updateContactTags } from "~/actions/contact/update-contact-tags"
import { getRandomTagColor } from "~/lib/tags"

const getSelectedTags = (contact: ContactModel, tags: TagModel[]): TagModel[] => {
	return tags.filter((tag) => contact.tagIds?.includes(tag.id))
}

const getSelectableTags = (selectedTags: TagModel[], allTags: TagModel[]): TagModel[] => {
	const selectedTagIds = new Set(selectedTags.map((tag) => tag.id))
	return allTags.filter((tag) => !selectedTagIds.has(tag.id))
}

type Props = {
	contact: ContactModel
	contactTags: TagModel[]
}

const useManageContactTags = ({ contact, contactTags }: Props) => {
	const [selectedTags, setSelectedTags] = useState<TagModel[]>(getSelectedTags(contact, contactTags))

	const selectableTags = useMemo(() => getSelectableTags(selectedTags, contactTags), [contactTags, selectedTags])

	const handleAddTag = (tag: TagModel): void => {
		setSelectedTags([...selectedTags, tag])
	}

	const handleRemoveTag = (tag?: TagModel): void => {
		if (!tag) setSelectedTags((prev) => [...prev.slice(0, -1)])
		else setSelectedTags(selectedTags.filter((t) => t.id !== tag.id))
	}

	const handleCreateTag = async (name: string): Promise<void> => {
		const res = await createTag({ name, color: getRandomTagColor() })
		if (!res.success) return

		handleAddTag(res.data)
	}

	const handleSubmit = async (): Promise<void> => {
		const res = await updateContactTags({
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
