import z from "zod"
import { FormFieldType } from "~/types/form.types"

const updateFormSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		title: z.string().min(1, "Title is required"),
		description: z.string().min(1, "Description is required"),
		fields: z
			.array(
				z.object({
					id: z.string().min(1, "ID is required"),
					type: z.enum(FormFieldType),
					label: z.string().min(1, "Label is required"),
					placeholder: z.string().optional(),
					required: z.boolean().optional(),
					order: z.number()
				})
			)
			.min(1, "At least one field is required")
			.refine(
				(arg) => {
					const ids = arg.reduce((acc, curr) => acc.add(curr.id), new Set<string>())
					return ids.size === arg.length
				},
				{
					message: "All fields must have unique IDs",
					path: ["fields"]
				}
			),
		submissionSettings: z.object({
			allowMultipleSubmissions: z.boolean(),
			identifierFieldId: z.string().optional()
		})
	})
	.refine(
		(arg) => {
			if (arg.submissionSettings.allowMultipleSubmissions) return true
			return arg.fields.find((field) => field.id === arg.submissionSettings.identifierFieldId)
		},
		{
			error: "An identifier field is required when multiple submissions are disabled",
			path: ["submissionSettings.identifierFieldId"]
		}
	)

type UpdateFormSchema = z.infer<typeof updateFormSchema>

export { updateFormSchema, type UpdateFormSchema }
