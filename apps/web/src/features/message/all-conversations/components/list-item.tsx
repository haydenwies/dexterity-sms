"use client"

import Link from "next/link"

import { ContactModel } from "@repo/types/contact"
import { ConversationModel } from "@repo/types/message"
import { Badge } from "@repo/ui/components/badge"
import { cn } from "@repo/ui/lib/utils"
import { useMemo } from "react"
import { routes } from "~/lib/routes"

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
	const displayName = useMemo((): string | undefined => {
		const contact = contacts.find((contact) => contact.id === conversation.contactId)
		if (!contact) return undefined
		if (!contact.firstName && !contact.lastName) return undefined

		return `${contact.firstName || ""} ${contact.lastName || ""}`.trim()
	}, [conversation, contacts])

	return (
		<Link
			href={routes.MESSAGE(organizationId, conversation.id)}
			className="block w-full"
		>
			<div
				className={cn(
					"hover:bg-accent hover:text-accent-foreground grid grid-cols-[1fr_auto] items-start gap-2 rounded-md px-4 py-2 transition-colors hover:cursor-pointer",
					className
				)}
			>
				<div className="min-w-0 flex-1">
					<p className="truncate font-medium">{displayName || conversation.recipient}</p>
					{conversation.lastMessagePreview && (
						<p className="text-muted-foreground truncate text-xs">{conversation.lastMessagePreview}</p>
					)}
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

export { AllConvesationsListItem }
