import { FormFieldType } from "~/types/form.types"
import { FormFieldDefaults } from "~/constants/form"
import { useUpdateFormContext } from "~/features/form/update-form/context/update-form-provider"

const useUpdateForm = () => {
	const { updateFormForm, updateFormFormValues, updateFormFieldArray } = useUpdateFormContext()

	const syncFieldOrders = () => {
		const currentFields = updateFormForm.getValues("fields")
		currentFields.forEach((_, index) => {
			updateFormForm.setValue(`fields.${index}.order`, index)
		})
	}

	const handleAddFormField = (index: number, formFieldType: FormFieldType) => {
		updateFormFieldArray.insert(index, {
			id: crypto.randomUUID(),
			type: formFieldType,
			label: FormFieldDefaults[formFieldType].label,
			placeholder: FormFieldDefaults[formFieldType].placeholder,
			required: FormFieldDefaults[formFieldType].required,
			order: index // This will be corrected by syncFieldOrders
		})

		syncFieldOrders()
	}

	const handleDeleteFormField = (fieldId: string) => {
		const fieldIndex = updateFormFormValues.fields.findIndex((field) => field.id === fieldId)
		if (fieldIndex === -1) return

		updateFormFieldArray.remove(fieldIndex)

		syncFieldOrders()
	}

	const handleSave = updateFormForm.handleSubmit((data) => {
		console.log(data)
	})

	return {
		updateFormForm,
		updateFormFormValues,
		handleAddFormField,
		handleDeleteFormField,
		handleSave
	}
}

export { useUpdateForm }
