"use client"

import { useState } from "react"

import { CAMPAIGN_MAX_SCHEDULE_DAYS } from "@repo/types/campaign"
import { Button } from "@repo/ui/components/button"
import { Calendar } from "@repo/ui/components/calendar"
import { Checkbox } from "@repo/ui/components/checkbox"
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
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover"
import { Spinner } from "@repo/ui/components/spinner"
import { TimeInput } from "@repo/ui/components/time-input"
import { cn } from "@repo/ui/lib/utils"

import { useSendCampaign } from "~/features/campaign/hooks/use-send-campaign"

type SendCampaignDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const SendCampaignDialog = ({ open, setOpen }: SendCampaignDialogProps) => {
	const { loading, form, formValues, handleSendCampaign } = useSendCampaign()

	const getStartMonth = (): Date => {
		return new Date()
	}

	const getEndMonth = (): Date => {
		const date = new Date()
		date.setDate(date.getDate() + CAMPAIGN_MAX_SCHEDULE_DAYS)

		return date
	}

	const getDisabledBefore = (): Date => {
		return new Date()
	}

	const getDisabledAfter = (): Date => {
		const date = new Date()
		date.setDate(date.getDate() + CAMPAIGN_MAX_SCHEDULE_DAYS)

		return date
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Send campaign</DialogTitle>
					<DialogDescription>Send or schedule this campaign.</DialogDescription>
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
												if (c) {
													const newDate = new Date()
													newDate.setDate(new Date().getDate() + 1)
													newDate.setHours(9, 0, 0, 0)
													field.onChange(newDate)
												} else field.onChange(undefined)
											}}
										/>
									</FormControl>
									<FormLabel>Schedule for later</FormLabel>
								</FormItem>
							)}
						/>
						{formValues.scheduledAt && (
							<FormField
								control={form.control}
								name="scheduledAt"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="grid grid-cols-2 gap-2">
												<Popover>
													<PopoverTrigger asChild>
														<Button
															className={cn("justify-start font-normal", {
																"text-muted-foreground": !field.value
															})}
															variant="outline"
														>
															<Icon
																className="text-muted-foreground"
																name={IconName.CALENDAR}
															/>
															{field.value
																? field.value.toLocaleDateString()
																: "Pick a date"}
														</Button>
													</PopoverTrigger>
													<PopoverContent
														align="start"
														className="w-auto overflow-hidden p-0"
														disablePortal
													>
														<Calendar
															mode="single"
															disabled={{
																before: getDisabledBefore(),
																after: getDisabledAfter()
															}}
															startMonth={getStartMonth()}
															endMonth={getEndMonth()}
															selected={field.value}
															onSelect={(date) => {
																if (date) field.onChange(date)
															}}
														/>
													</PopoverContent>
												</Popover>
												<TimeInput
													value={field.value}
													onChange={(date) => {
														console.log(date)
														if (date) field.onChange(date)
													}}
												/>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						)}
					</form>
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
						onClick={() => handleSendCampaign()}
					>
						{loading ? <Spinner /> : <Icon name={IconName.SEND} />}
						{formValues.scheduledAt ? "Schedule" : "Send"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const SendCampaignButton = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Icon name={IconName.ARROW_RIGHT} />
				Continue
			</Button>
			<SendCampaignDialog
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}

export { SendCampaignButton }
