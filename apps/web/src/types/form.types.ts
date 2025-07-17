enum FormFieldType {
	SHORT_TEXT = "text",
	LONG_TEXT = "long-text",
	EMAIL = "email",
	PHONE = "phone",
	DATE = "date"
}

type FormField = {
	id: string
	type: FormFieldType
	label: string
	placeholder?: string
	required?: boolean
}

type FormSubmissionSettings = {
	allowMultipleSubmissions: boolean
	identifierFieldId?: string
}

type Form = {
	id: string
	organizationId: string
	name: string
	title: string
	description?: string
	fields: FormField[]
	submissionSettings: FormSubmissionSettings
	createdAt: Date
	updatedAt: Date
}

export { type Form, FormFieldType }
