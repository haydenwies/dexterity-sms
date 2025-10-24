"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { SendMessageDto, sendMessageDtoSchema } from "@dexterity-sms/core/conversation"
import { Button } from "@dexterity-sms/ui/components/button"
import { Form, FormControl, FormField, FormItem } from "@dexterity-sms/ui/components/form"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"
import { Input } from "@dexterity-sms/ui/components/input"
import { toast } from "@dexterity-sms/ui/components/sonner"
import { cn } from "@dexterity-sms/ui/lib/utils"

import { sendMessage } from "~/actions/conversation/send-message"

type MessageInputProps = Readonly<{
	className?: string
	params: { organizationId: string; conversationId: string }
}>

const MessageInput = ({ className, params }: MessageInputProps) => {
	const form = useForm<SendMessageDto>({
		resolver: zodResolver(sendMessageDtoSchema),
		defaultValues: {
			body: ""
		}
	})
	const { isSubmitting } = form.formState

	const handleSubmit = form.handleSubmit(async (data: SendMessageDto) => {
		const res = await sendMessage(params.organizationId, params.conversationId, data)
		if (!res.success) toast.error(res.error)
		else form.reset()
	})

	return (
		<form
			className={cn("flex items-center gap-2", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<Form {...form}>
				<FormField
					control={form.control}
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
					disabled={isSubmitting}
				>
					<Icon name={IconName.SEND} />
				</Button>
			</Form>
		</form>
	)
}

export { MessageInput }
