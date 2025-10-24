"use client"

import { use, useEffect, useRef, useState } from "react"

import { MessageDirection, type MessageModel } from "@dexterity-sms/core/message"
import { cn } from "@dexterity-sms/ui/lib/utils"

import { readConversation } from "~/actions/conversation/read-conversation"
import { streamManyConversationMessages } from "~/data/conversation/stream-many-conversation-messages"
import { useSse } from "~/hooks/use-sse"

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
				<p className="wrap-break-words whitespace-pre-wrap">{message.body}</p>
			</div>
		</div>
	)
}

type AllMessagesListProps = {
	className?: string
	params: { organizationId: string; conversationId: string }
	messagesPromise: Promise<MessageModel[]>
}
const AllMessagesList = ({ className, params, messagesPromise }: AllMessagesListProps) => {
	const initialMessages = use(messagesPromise)

	const messagesEndRef = useRef<HTMLDivElement>(null)

	const [messages, setMessages] = useState<MessageModel[]>(initialMessages)
	useSse<MessageModel>(() => streamManyConversationMessages(params.organizationId, params.conversationId), {
		onMessage: async (data) => {
			setMessages((prev) => {
				const existingMessage = prev.find((m) => m.id === data.id)
				if (existingMessage) return prev.map((m) => (m.id === data.id ? data : m))
				else return [...prev, data]
			})

			if (data.direction === MessageDirection.INBOUND)
				await readConversation(params.organizationId, params.conversationId)
		}
	})

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
