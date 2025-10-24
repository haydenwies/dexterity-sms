"use client"

import Link from "next/link"
import { use, useMemo, useState } from "react"

import { type ContactModel } from "@dexterity-sms/core/contact"
import { type ConversationModel } from "@dexterity-sms/core/conversation"
import { routes } from "@dexterity-sms/routes"
import { Badge } from "@dexterity-sms/ui/components/badge"
import { cn } from "@dexterity-sms/ui/lib/utils"

import { readConversation } from "~/actions/conversation/read-conversation"
import { streamManyConversations } from "~/data/conversation/stream-many-conversations"
import { useSse } from "~/hooks/use-sse"

type AllConversationsListItemProps = Readonly<{
	className?: string
	params: { organizationId: string; conversationId?: string }
	conversation: ConversationModel
	contacts: ContactModel[]
}>

const AllConvesationsListItem = ({ className, params, conversation, contacts }: AllConversationsListItemProps) => {
	const displayName = useMemo((): string | undefined => {
		const contact = contacts.find((contact) => contact.phone === conversation.recipient)
		if (!contact) return undefined
		if (!contact.firstName && !contact.lastName) return undefined

		return `${contact.firstName || ""} ${contact.lastName || ""}`.trim()
	}, [conversation, contacts])

	return (
		<Link
			href={routes.web.CONVERSATION(params.organizationId, conversation.id)}
			className="block w-full"
		>
			<div
				className={cn(
					"hover:bg-accent hover:text-accent-foreground grid grid-cols-[1fr_auto] items-start gap-2 rounded-md px-4 py-2 transition-colors hover:cursor-pointer",
					{ "bg-accent": params.conversationId === conversation.id },
					className
				)}
			>
				<span className="w-full overflow-hidden">
					<p className="truncate font-medium">{displayName || conversation.recipient}</p>
					<p className="text-muted-foreground truncate text-xs">
						{conversation.lastMessagePreview || "No messages"}
					</p>
				</span>
				{conversation.unreadCount > 0 && (
					<Badge
						className="ml-auto"
						variant="destructive"
						size="sm"
					>
						{conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
					</Badge>
				)}
			</div>
		</Link>
	)
}

type AllConversationsListProps = Readonly<{
	className?: string
	params: { organizationId: string; conversationId?: string }
	conversationsPromise: Promise<ConversationModel[]>
	contactsPromise: Promise<ContactModel[]>
}>

const AllConversationsList = ({
	className,
	params,
	conversationsPromise,
	contactsPromise
}: AllConversationsListProps) => {
	const initialConversations = use(conversationsPromise)
	const contacts = use(contactsPromise)

	const [conversations, setConversations] = useState<ConversationModel[]>(initialConversations)
	useSse<ConversationModel>(() => streamManyConversations(params.organizationId), {
		onOpen: async () => {
			if (params.conversationId) await readConversation(params.organizationId, params.conversationId)
		},
		onMessage: (data) => {
			setConversations((prev) => {
				const existingConversation = prev.find((c) => c.id === data.id)
				if (existingConversation) return prev.map((c) => (c.id === data.id ? data : c))
				else return [...prev, data]
			})
		}
	})

	return (
		<div className={cn("border-border flex h-full w-full flex-col gap-1 overflow-y-auto border-r p-2", className)}>
			{conversations.map((conversation) => (
				<AllConvesationsListItem
					key={conversation.id}
					params={params}
					conversation={conversation}
					contacts={contacts}
				/>
			))}
		</div>
	)
}

export { AllConversationsList }
