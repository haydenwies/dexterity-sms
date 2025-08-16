"use client"

import { useCallback, useRef, useState } from "react"

import { type ContactModel, type ContactTagModel } from "@repo/types/contact"
import { Button } from "@repo/ui/components/button"
import { Command, CommandInput, CommandItem, CommandList } from "@repo/ui/components/command"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@repo/ui/components/dialog"
import { Icon, IconName } from "@repo/ui/components/icon"

import { ContactTagBadge } from "~/features/contact/all-contacts-table/components/tag-badge"
import { useManageContactTags } from "~/features/contact/all-contacts-table/hooks/use-manage-contact-tags"

type Props = {
	contact: ContactModel
	contactTags: ContactTagModel[]
	open: boolean
	setOpen: (open: boolean) => void
}

const ManageContactTagsDialog = ({ contact, contactTags, open, setOpen }: Props) => {
	const [commandOpen, setCommandOpen] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)

	const { selectedTags, selectableTags, handleAddTag, handleRemoveTag, handleCreateTag, handleSubmit } =
		useManageContactTags({
			contact,
			contactTags
		})

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current
			if (!input) return

			if (e.key === "Delete" || e.key === "Backspace") if (input.value === "") handleRemoveTag()
			if (e.key === "Escape") input.blur()
		},
		[handleRemoveTag]
	)

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Manage Tags</DialogTitle>
					<DialogDescription>Add or remove tags from this contact</DialogDescription>
				</DialogHeader>
				<Command
					className="overflow-visible bg-transparent"
					onKeyDown={handleKeyDown}
				>
					<div className="flex flex-wrap gap-2">
						{selectedTags.map((tag) => (
							<ContactTagBadge
								key={tag.id}
								tag={tag}
								removable={true}
								onRemove={() => handleRemoveTag(tag)}
							/>
						))}
						<CommandInput
							className="h-auto min-w-20 flex-1 rounded-none py-0"
							onFocus={() => setCommandOpen(true)}
							onBlur={() => setCommandOpen(false)}
							onValueChange={setSearchValue}
							placeholder="Search or create tags..."
							ref={inputRef}
							value={searchValue}
						/>
					</div>
					<div className="relative mt-2">
						{commandOpen && (selectableTags.length > 0 || searchValue.trim() !== "") && (
							<div className="bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-none">
								<CommandList>
									{selectableTags.map((tag) => (
										<CommandItem
											key={tag.id}
											onMouseDown={(e) => {
												e.preventDefault()
												e.stopPropagation()
											}}
											onSelect={() => {
												handleAddTag(tag)
												setSearchValue("")
											}}
										>
											<div
												className="size-2 rounded-full"
												style={{ backgroundColor: tag.color }}
											/>
											{tag.name}
										</CommandItem>
									))}
									{selectableTags.findIndex(
										(tag) => tag.name.trim().toLowerCase() === searchValue.trim().toLowerCase()
									) === -1 &&
										searchValue.trim() !== "" && (
											<CommandItem
												id="create"
												forceMount={true}
												onSelect={() => handleCreateTag(searchValue)}
												value="create"
											>
												Create &quot;{searchValue}&quot;
											</CommandItem>
										)}
								</CommandList>
							</div>
						)}
					</div>
				</Command>
				<DialogFooter>
					<Button onClick={handleSubmit}>
						<Icon name={IconName.SAVE} />
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export { ManageContactTagsDialog }
