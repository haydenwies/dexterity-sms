"use client"

import { Button } from "@repo/ui/components/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandInputIcon,
	CommandInputWrapper,
	CommandItem,
	CommandList
} from "@repo/ui/components/command"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover"
import { useState } from "react"

type NewConversationDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const NewConversationDialog = ({ open, setOpen }: NewConversationDialogProps) => {
	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Conversation</DialogTitle>
				</DialogHeader>
				<div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								className="w-full justify-start"
								variant="outline"
							>
								Select contact
								<Icon
									className="ml-auto"
									name={IconName.CHEVRON_DOWN}
								/>
							</Button>
						</PopoverTrigger>
						<PopoverContent
							align="start"
							className="p-0"
							disablePortal
						>
							<Command>
								<CommandInputWrapper>
									<CommandInputIcon />
									<CommandInput placeholder="Search contacts..." />
								</CommandInputWrapper>
								<CommandList>
									<CommandEmpty>No results</CommandEmpty>
									<CommandGroup>
										<CommandItem>asd</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
				<DialogFooter>
					<Button>Create</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const NewConversationButton = () => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Icon name={IconName.PLUS} />
				New Conversation
			</Button>
			<NewConversationDialog
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}

export { NewConversationButton }
