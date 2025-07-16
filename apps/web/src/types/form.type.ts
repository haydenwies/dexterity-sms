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
	order: number
	options?: string[]
}

type Form = {
	id: string
	organizationId: string
	title: string
	description?: string
	fields: FormField[]
	createdAt: Date
	updatedAt: Date
}

export { type Form }
