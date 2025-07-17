"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select"
import { Switch } from "@repo/ui/components/switch"
import { Input } from "@repo/ui/components/input"
import { Textarea } from "@repo/ui/components/textarea"
import { Icon } from "@repo/ui/components/icon"

import { useUpdateForm } from "~/features/form/update-form/hooks/use-update-form"
import { formFieldOptions } from "~/features/form/update-form/components/form-field-options"

const FormSettingsForm = () => {
	const { updateFormForm, updateFormFieldArray } = useUpdateForm()

	return (
		<form className="flex flex-col gap-4">
			<Form {...updateFormForm}>
				<FormField
					control={updateFormForm.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Form name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={updateFormForm.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="Form title"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={updateFormForm.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Form description"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={updateFormForm.control}
					name="submissionSettings.allowMultipleSubmissions"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center gap-4">
								<FormLabel>Allow multiple submissions</FormLabel>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={updateFormForm.control}
					name="submissionSettings.identifierFieldId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Identifier field</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									value={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select an identifier field" />
									</SelectTrigger>
									<SelectContent>
										{updateFormFieldArray.fields.map((formField) => (
											<SelectItem
												key={formField.id}
												value={formField.id}
											>
												<Icon name={formFieldOptions[formField.type].iconName} />
												{formField.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
			</Form>
		</form>
	)
}

export { FormSettingsForm }
