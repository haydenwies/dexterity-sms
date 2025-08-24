"use client"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

type MessageInputProps = {
	className?: string
}
const MessageInput = ({ className }: MessageInputProps) => {
	return (
		<div className={cn("flex items-center gap-2 px-6 py-4", className)}>
			<Input
				placeholder="Type a message..."
				className="flex-1"
			/>
			<Button
				size="iconSm"
				className="px-3"
			>
				<Icon name={IconName.SEND} />
			</Button>
		</div>
	)
}

export { MessageInput }
