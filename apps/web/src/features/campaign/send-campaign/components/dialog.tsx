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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"

import { Checkbox } from "@repo/ui/components/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select"
import { useSendCampaign } from "../hooks/use-send-campaign"

type Props = {
	campaignId: string
	open: boolean
	onOpenChange: (open: boolean) => void
}

const SendCampaignDialog = ({ campaignId, open, onOpenChange }: Props) => {
	const { loading, form, handleSendCampaign } = useSendCampaign(campaignId)

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Send Campaign</DialogTitle>
					<DialogDescription>Send or schedule this campaign</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="scheduledAt"
							render={({ field }) => (
								<FormItem className="flex items-center gap-2">
									<FormControl>
										<Checkbox
											checked={!!field.value}
											onCheckedChange={(c) => {
												if (c) field.onChange(new Date())
												else field.onChange(undefined)
											}}
										/>
									</FormControl>
									<FormLabel>Schedule for later</FormLabel>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactTagIds"
							render={() => (
								<FormItem>
									<FormLabel>Send to</FormLabel>
									<FormControl>
										<Select value="all">
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select recipients" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">All contacts</SelectItem>
												<SelectItem
													disabled
													value="tags"
												>
													Tags &#40;coming soon&#41;
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						onClick={() => onOpenChange(false)}
						variant="ghost"
					>
						Cancel
					</Button>
					<Button
						disabled={loading}
						onClick={() => handleSendCampaign()}
					>
						<Icon name={IconName.SEND} />
						Send
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export { SendCampaignDialog }
