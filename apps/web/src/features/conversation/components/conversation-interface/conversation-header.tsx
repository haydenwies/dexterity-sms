"use client"

import { use, useMemo } from "react"

import { type ContactModel } from "@dexterity-sms/core/contact"
import { type ConversationModel } from "@dexterity-sms/core/conversation"
import { cn } from "@dexterity-sms/ui/lib/utils"

type ConversationHeaderProps = {
	conversationPromise: Promise<ConversationModel>
	contactsPromise: Promise<ContactModel[]>
	className?: string
}
const ConversationHeader = ({ conversationPromise, contactsPromise, className }: ConversationHeaderProps) => {
	const conversation = use(conversationPromise)
	const contacts = use(contactsPromise)

	const displayName = useMemo((): string | undefined => {
		const contact = contacts.find((contact) => contact.phone === conversation.recipient)
		if (!contact) return undefined
		if (!contact.firstName && !contact.lastName) return undefined

		return `${contact.firstName || ""} ${contact.lastName || ""}`.trim()
	}, [conversation, contacts])

	return (
		<div className={cn("flex items-center", className)}>
			<div>
				<h2 className="text-lg font-semibold">{displayName || conversation.recipient}</h2>
				{displayName && <p className="text-muted-foreground">{conversation.recipient}</p>}
			</div>
		</div>
	)
}

export { ConversationHeader }
