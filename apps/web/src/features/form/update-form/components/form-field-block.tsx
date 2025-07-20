"use client"

import { useState } from "react"
import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/button"
import { Label } from "@repo/ui/components/label"
import { Input } from "@repo/ui/components/input"
import { Textarea } from "@repo/ui/components/textarea"
import { Checkbox } from "@repo/ui/components/checkbox"
import { Badge } from "@repo/ui/components/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@repo/ui/components/card"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"

import { FormFieldType } from "~/types/form.types"
import { useUpdateForm } from "~/features/form/update-form/hooks/use-update-form"
import { formFieldOptions } from "~/features/form/update-form/components/form-field-options"

type Props = {
	className?: string
	fieldId: string
}

const FormFieldBlock = ({ className, fieldId }: Props) => {
	const [isEditing, setIsEditing] = useState(false)

	const { updateFormForm, updateFormFormValues, handleDeleteFormField } = useUpdateForm()

	const formField = updateFormFormValues.fields.find((field) => field.id === fieldId)
	if (!formField) return null

	const renderPreviewInput = () => {
		switch (formField.type) {
			case FormFieldType.SHORT_TEXT:
				return (
					<Input
						className="disabled:opacity-100"
						disabled={true}
						placeholder={formField.placeholder}
					/>
				)
			case FormFieldType.LONG_TEXT:
				return (
					<Textarea
						className="disabled:opacity-100"
						disabled={true}
						placeholder={formField.placeholder}
					/>
				)
			case FormFieldType.EMAIL:
				return (
					<Input
						className="disabled:opacity-100"
						disabled={true}
						placeholder={formField.placeholder}
						type="email"
					/>
				)
			case FormFieldType.PHONE:
				return (
					<Input
						className="disabled:opacity-100"
						disabled={true}
						placeholder={formField.placeholder}
						type="tel"
					/>
				)
			case FormFieldType.DATE:
				return (
					<Input
						className="disabled:opacity-100"
						disabled={true}
						placeholder={formField.placeholder}
						type="date"
					/>
				)
			default:
				return null
		}
	}

	return (
		<Card className={cn("gap-4 py-4", className)}>
			<CardHeader className="px-4">
				<div className="flex items-center gap-2">
					<Icon
						className="text-muted-foreground"
						name={formFieldOptions[formField.type].iconName}
					/>
					<CardDescription className="font-medium">
						{formField.type.toUpperCase().replace("-", " ")}
					</CardDescription>
					{formField.required && (
						<Badge
							className="ml-2"
							variant="destructive"
						>
							Required
						</Badge>
					)}
				</div>
				<CardAction className="flex gap-1">
					<Button
						className={cn({ "bg-accent text-accent-foreground": isEditing })}
						onClick={() => setIsEditing(!isEditing)}
						size="sm"
						variant="ghost"
					>
						<Icon name={IconName.SETTINGS} />
					</Button>
					<Button
						className="text-destructive hover:text-destructive"
						onClick={() => handleDeleteFormField(formField.id)}
						size="sm"
						variant="ghost"
					>
						<Icon name={IconName.TRASH} />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent className="px-4">
				{isEditing ? (
					<form className="flex flex-col gap-4">
						<Form {...updateFormForm}>
							<FormField
								control={updateFormForm.control}
								name={`fields.${formField.order}.label`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Label</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateFormForm.control}
								name={`fields.${formField.order}.placeholder`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Placeholder</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={updateFormForm.control}
								name={`fields.${formField.order}.required`}
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center gap-2">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel>Required</FormLabel>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</Form>
					</form>
				) : (
					<div className="space-y-2">
						<Label>
							{formField.label}
							{formField.required && <span className="text-destructive">*</span>}
						</Label>
						{renderPreviewInput()}
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export { FormFieldBlock }
