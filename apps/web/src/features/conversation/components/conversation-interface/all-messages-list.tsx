"use client"

import { use, useEffect, useRef } from "react"

import { MessageDirection, type MessageModel } from "@repo/types/message"
import { cn } from "@repo/ui/lib/utils"

import { useStreamManyConversationMessages } from "~/data/conversation/use-stream-many-conversation-messages"

type MessageBubbleProps = {
	message: MessageModel
	className?: string
}
const MessageBubble = ({ message, className }: MessageBubbleProps) => {
	const isOutbound = message.direction === MessageDirection.OUTBOUND

	return (
		<div className={cn("mb-3 flex w-full", isOutbound ? "justify-end" : "justify-start", className)}>
			<div
				className={cn("max-w-[70%] rounded-2xl px-4 py-2 text-sm", {
					"bg-primary text-primary-foreground rounded-br-md": isOutbound,
					"bg-secondary text-secondary-foreground rounded-bl-md": !isOutbound
				})}
			>
				<p className="whitespace-pre-wrap break-words">{message.body}</p>
			</div>
		</div>
	)
}

type AllMessagesListProps = {
	messagesPromise: Promise<MessageModel[]>
	className?: string
}
const AllMessagesList = ({ messagesPromise, className }: AllMessagesListProps) => {
	const initialMessages = use(messagesPromise)
	const messages = useStreamManyConversationMessages(initialMessages)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	// Auto-scroll to bottom when messages update
	useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages])

	if (messages.length === 0)
		return (
			<div className={cn("flex h-full items-center justify-center", className)}>
				<p className="text-muted-foreground text-sm">No messages yet</p>
			</div>
		)

	return (
		<div className={cn("h-full space-y-2 overflow-y-auto", className)}>
			{messages.map((message) => (
				<MessageBubble
					key={message.id}
					message={message}
				/>
			))}
			<div ref={messagesEndRef} />
		</div>
	)
}

export { AllMessagesList }
