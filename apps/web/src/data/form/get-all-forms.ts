import "server-only"

import { Form } from "~/types/form.types"

const getAllForms = async (): Promise<Form[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return [
		{
			id: "1",
			organizationId: "1",
			name: "form-1",
			title: "Form 1",
			description: "Form 1 description",
			fields: [],
			submissionSettings: {
				allowMultipleSubmissions: true
			},
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]
}

export { getAllForms }
