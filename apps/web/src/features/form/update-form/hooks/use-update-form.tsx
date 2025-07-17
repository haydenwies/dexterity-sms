import { FormFieldType } from "~/types/form.types"
import { FormFieldDefaults } from "~/constants/form"
import { useUpdateFormContext } from "../context/update-form-provider"

const useUpdateForm = () => {
	const { updateFormForm, updateFormFieldArray } = useUpdateFormContext()

	const handleAddFormField = (index: number, formFieldType: FormFieldType) => {
		console.log("Adding form field", formFieldType)

		updateFormFieldArray.insert(index, {
			id: crypto.randomUUID(),
			type: formFieldType,
			label: FormFieldDefaults[formFieldType].label,
			placeholder: FormFieldDefaults[formFieldType].placeholder,
			required: FormFieldDefaults[formFieldType].required
		})
	}

	return {
		updateFormForm,
		updateFormFieldArray,
		handleAddFormField
	}
}

export { useUpdateForm }
