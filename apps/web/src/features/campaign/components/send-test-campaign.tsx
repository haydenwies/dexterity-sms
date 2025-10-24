"use client"

import { useState } from "react"

import { Button } from "@dexterity-sms/ui/components/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@dexterity-sms/ui/components/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@dexterity-sms/ui/components/form"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"
import { PhoneInput } from "@dexterity-sms/ui/components/phone-input"
import { Spinner } from "@dexterity-sms/ui/components/spinner"

import { useSendTestCampaign } from "~/features/campaign/hooks/use-send-test-campaign"
import { PLACEHOLDERS } from "~/lib/placeholders"

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
					<DialogTitle>Test Campaign</DialogTitle>
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
										placeholder={PLACEHOLDERS.phone}
										type="tel"
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
						{loading && <Spinner />}
						Send test
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
