"use client"

import { use } from "react"

import { type ContactModel } from "@repo/types/contact"
import { type ConversationModel } from "@repo/types/conversation"
import { cn } from "@repo/ui/lib/utils"

import { AllConvesationsListItem } from "~/features/message/all-conversations/components/list-item"

type AllConversationsListProps = {
	organizationId: string
	conversationsPromise: Promise<ConversationModel[]>
	contactsPromise: Promise<ContactModel[]>
	className?: string
}

const AllConversationsList = ({
	organizationId,
	className,
	conversationsPromise,
	contactsPromise
}: AllConversationsListProps) => {
	const conversations = use(conversationsPromise)
	const contacts = use(contactsPromise)

	return (
		<div className={cn("border-border flex h-full w-full flex-col gap-1 overflow-y-auto border-r p-2", className)}>
			{conversations.map((conversation) => (
				<AllConvesationsListItem
					key={conversation.id}
					organizationId={organizationId}
					conversation={conversation}
					contacts={contacts}
				/>
			))}
		</div>
	)
}

export { AllConversationsList }
