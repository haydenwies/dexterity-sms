"use client"

import { createContext, useContext } from "react"
import { useFieldArray, type UseFieldArrayReturn, useForm, type UseFormReturn } from "react-hook-form"
import { type UpdateFormSchema, updateFormSchema } from "../schema/update-form.schema"
import { Form } from "~/types/form.types"
import { zodResolver } from "@hookform/resolvers/zod"

type UpdateFormContextType = {
	updateFormForm: UseFormReturn<UpdateFormSchema>
	updateFormFieldArray: UseFieldArrayReturn<UpdateFormSchema, "fields", "id">
}
const UpdateFormContext = createContext<UpdateFormContextType | null>(null)

type UpdateFormProviderProps = {
	children: React.ReactNode
	form: Form
}

const UpdateFormProvider = ({ children, form }: UpdateFormProviderProps) => {
	const updateFormForm = useForm({
		resolver: zodResolver(updateFormSchema),
		defaultValues: {
			name: form.name,
			title: form.title,
			description: form.description,
			fields: form.fields.map((formField) => ({
				id: formField.id, // TODO Create burner ids
				type: formField.type,
				label: formField.label,
				placeholder: formField.placeholder,
				required: formField.required
			})),
			submissionSettings: form.submissionSettings
		}
	})

	const updateFormFieldArray = useFieldArray({
		name: "fields",
		control: updateFormForm.control,
		keyName: "id"
	})

	return (
		<UpdateFormContext.Provider value={{ updateFormForm, updateFormFieldArray }}>
			{children}
		</UpdateFormContext.Provider>
	)
}

const useUpdateFormContext = () => {
	const context = useContext(UpdateFormContext)
	if (!context) throw new Error("useUpdateFormContext must be used within a UpdateFormProvider")

	return context
}

export { UpdateFormProvider, useUpdateFormContext }
