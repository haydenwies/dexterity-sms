import "server-only"

import { Form, FormFieldType } from "~/types/form.types"

const getForm = async (formId: string): Promise<Form> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return {
		id: formId,
		organizationId: "1",
		name: "Test Form",
		title: "Test Title",
		description: "Test Description",
		fields: [
			{
				id: "1",
				type: FormFieldType.SHORT_TEXT,
				label: "Test Field",
				placeholder: "Test Placeholder",
				required: true,
				order: 0
			}
		],
		submissionSettings: {
			allowMultipleSubmissions: false,
			identifierFieldId: undefined
		},
		createdAt: new Date(),
		updatedAt: new Date()
	}
}

export { getForm }
