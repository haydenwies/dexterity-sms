"use client"

import { Button } from "@repo/ui/components/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@repo/ui/components/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { PhoneInput } from "@repo/ui/components/phone-input"

import { useSendTestCampaign } from "~/features/campaign/send-test-campaign/hooks/use-send-test-campaign"
import { placeholders } from "~/lib/placeholders"

type Props = {
	campaignId: string
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SendTestCampaignDialog = ({ campaignId, open, onOpenChange }: Props) => {
	const { form, handleSendTestCampaign } = useSendTestCampaign(campaignId)

	return (
		<Dialog
			onOpenChange={onOpenChange}
			open={open}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Test Campaign</DialogTitle>
					<DialogDescription>Provide a phone number to send a test message</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<FormField
						control={form.control}
						name="to"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<PhoneInput
										placeholder={placeholders.PHONE}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</Form>
				<DialogFooter>
					<Button onClick={handleSendTestCampaign}>
						<Icon name={IconName.SEND} />
						Send Test
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export { SendTestCampaignDialog }
