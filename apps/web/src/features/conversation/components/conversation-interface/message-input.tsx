"use client"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"
import { useState } from "react"
import { useSendMessage } from "../../hooks/use-send-message"

type MessageInputProps = {
	className?: string
}
const MessageInput = ({ className }: MessageInputProps) => {
	const [message, setMessage] = useState<string>("")
	const { loading, error, handleSendMessage } = useSendMessage()

	return (
		<div className={cn("flex items-center gap-2 px-6 py-4", className)}>
			<Input
				placeholder="Type a message..."
				className="flex-1"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<Button
				size="iconSm"
				className="px-3"
				disabled={loading}
				onClick={() => handleSendMessage(message)}
			>
				<Icon name={IconName.SEND} />
			</Button>
		</div>
	)
}

export { MessageInput }
