"use client"

import { CampaignModel } from "@repo/types/campaign"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Textarea } from "@repo/ui/components/textarea"

import { useUpdateCampaign } from "~/features/campaign/update-campaign/hooks/use-update-campaign"

type Props = {
	campaign: CampaignModel
}

const UpdateCampaignInterface = ({ campaign }: Props) => {
	const { form } = useUpdateCampaign(campaign)

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Body</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export { UpdateCampaignInterface }
