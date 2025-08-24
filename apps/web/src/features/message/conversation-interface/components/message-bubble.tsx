"use client"

import { type MessageModel } from "@repo/types/message"

type MessageBubbleProps = {
	message: MessageModel
}

/**
 * This will display a message bubble (should accomodate inbound and outbound messages)
 */
const MessageBubble = ({ message }: MessageBubbleProps) => {
	return <></>
}

export { MessageBubble }
