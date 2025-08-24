"use client"

import { type MessageModel } from "@repo/types/message"
import { MessageDirection } from "@repo/types/message/enums"
import { cn } from "@repo/ui/lib/utils"

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

export { MessageBubble }
