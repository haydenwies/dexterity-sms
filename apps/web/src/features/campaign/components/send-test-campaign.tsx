"use client"

import { useState } from "react"

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

import { useSendTestCampaign } from "~/features/campaign/hooks/use-send-test-campaign"
import { placeholders } from "~/lib/placeholders"

type SendTestCampaignDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const SendTestCampaignDialog = ({ open, setOpen }: SendTestCampaignDialogProps) => {
	const { loading, form, handleSendTest } = useSendTestCampaign()

	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Test campaign</DialogTitle>
					<DialogDescription>Provide a phone number to send a test message.</DialogDescription>
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
					<Button
						disabled={loading}
						onClick={() => setOpen(false)}
						variant="ghost"
					>
						Cancel
					</Button>
					<Button
						disabled={loading}
						onClick={() => handleSendTest({ onSuccess: () => setOpen(false) })}
					>
						{loading ? (
							<Icon
								className="animate-spin"
								name={IconName.SPINNER}
							/>
						) : (
							<Icon name={IconName.SEND} />
						)}
						Send Test
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const SendTestCampaignButton = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="secondary"
			>
				<Icon name={IconName.TEST_TUBE} />
				Test
			</Button>
			<SendTestCampaignDialog
				setOpen={setOpen}
				open={open}
			/>
		</>
	)
}

export { SendTestCampaignButton }
