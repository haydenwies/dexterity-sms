"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { use, useMemo } from "react"

import { routes } from "@repo/routes"
import { type ContactModel } from "@repo/types/contact"
import { type ConversationModel } from "@repo/types/conversation"
import { Badge } from "@repo/ui/components/badge"
import { cn } from "@repo/ui/lib/utils"

import { useStreamManyConversations } from "~/data/conversation/use-stream-many-conversations"

type AllConversationsListItemProps = {
	organizationId: string
	conversation: ConversationModel
	contacts: ContactModel[]
	className?: string
}
const AllConvesationsListItem = ({
	organizationId,
	conversation,
	contacts,
	className
}: AllConversationsListItemProps) => {
	const params = useParams()

	const displayName = useMemo((): string | undefined => {
		const contact = contacts.find((contact) => contact.phone === conversation.recipient)
		if (!contact) return undefined
		if (!contact.firstName && !contact.lastName) return undefined

		return `${contact.firstName || ""} ${contact.lastName || ""}`.trim()
	}, [conversation, contacts])

	return (
		<Link
			href={routes.web.CONVERSATION(organizationId, conversation.id)}
			className="block w-full"
		>
			<div
				className={cn(
					"hover:bg-accent hover:text-accent-foreground grid grid-cols-[1fr_auto] items-start gap-2 rounded-md px-4 py-2 transition-colors hover:cursor-pointer",
					{ "bg-accent": params.conversationId === conversation.id },
					className
				)}
			>
				<div className="min-w-0 flex-1">
					<p className="truncate font-medium">{displayName || conversation.recipient}</p>
					<p className="text-muted-foreground truncate text-xs">
						{conversation.lastMessagePreview || "No messages"}
					</p>
				</div>
				{conversation.unreadCount > 0 && (
					<Badge
						variant="destructive"
						className="rounded-full p-1 py-0"
					>
						{conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
					</Badge>
				)}
			</div>
		</Link>
	)
}

type AllConversationsListProps = {
	className?: string
	organizationId: string
	conversationsPromise: Promise<ConversationModel[]>
	contactsPromise: Promise<ContactModel[]>
}
const AllConversationsList = ({
	className,
	organizationId,
	conversationsPromise,
	contactsPromise
}: AllConversationsListProps) => {
	const initialConversations = use(conversationsPromise)
	const contacts = use(contactsPromise)

	const conversations = useStreamManyConversations(initialConversations)

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
