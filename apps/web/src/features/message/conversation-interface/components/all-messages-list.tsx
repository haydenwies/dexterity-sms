"use client"

import { use } from "react"

import { type MessageModel } from "@repo/types/message"
import { cn } from "@repo/ui/lib/utils"

import { MessageBubble } from "~/features/message/conversation-interface/components/message-bubble"

type AllMessagesListProps = {
	messagesPromise: Promise<MessageModel[]>
	className?: string
}
const AllMessagesList = ({ messagesPromise, className }: AllMessagesListProps) => {
	const messages = use(messagesPromise)

	if (messages.length === 0)
		return (
			<div className={cn("flex flex-1 items-center justify-center p-4", className)}>
				<p className="text-muted-foreground text-sm">No messages yet</p>
			</div>
		)

	return (
		<div className={cn("flex-1 space-y-2 overflow-y-auto px-6 py-4", className)}>
			{messages.map((message) => (
				<MessageBubble
					key={message.id}
					message={message}
				/>
			))}
		</div>
	)
}

export { AllMessagesList }
