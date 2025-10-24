"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dexterity-sms/ui/components/form"
import { Input } from "@dexterity-sms/ui/components/input"
import { Textarea } from "@dexterity-sms/ui/components/textarea"

import { useUpdateCampaign } from "~/features/campaign/hooks/use-update-campaign"

const UpdateCampaignInterface = () => {
	const { form } = useUpdateCampaign()

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
								<Input
									placeholder="Untitled campaign"
									{...field}
								/>
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
								<Textarea
									placeholder="Your campaign body..."
									{...field}
								/>
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
