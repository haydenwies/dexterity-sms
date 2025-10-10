"use client"

import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { useSendMessage } from "~/features/conversation/hooks/use-send-message"

type MessageInputProps = {
	className?: string
}
const MessageInput = ({ className }: MessageInputProps) => {
	const { loading, sendConversationMessageForm, handleSendMessage } = useSendMessage()

	return (
		<form
			className={cn("flex items-center gap-2", className)}
			onSubmit={handleSendMessage}
		>
			<Form {...sendConversationMessageForm}>
				<FormField
					control={sendConversationMessageForm.control}
					name="body"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input
									placeholder="Type a message..."
									className="flex-1"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					size="iconSm"
					className="px-3"
					disabled={loading}
				>
					<Icon name={IconName.SEND} />
				</Button>
			</Form>
		</form>
	)
}

export { MessageInput }
