import { FormFieldType } from "~/types/form.types"

const FormFieldDefaults: Record<
	FormFieldType,
	{
		label: string
		placeholder: string
		required?: boolean
	}
> = {
	[FormFieldType.SHORT_TEXT]: {
		label: "Short Text",
		placeholder: "Short Text",
		required: false
	},
	[FormFieldType.LONG_TEXT]: {
		label: "Long Text",
		placeholder: "Long Text",
		required: false
	},
	[FormFieldType.EMAIL]: {
		label: "Email",
		placeholder: "example@domain.com",
		required: false
	},
	[FormFieldType.PHONE]: {
		label: "Phone",
		placeholder: "+1234567890",
		required: false
	},
	[FormFieldType.DATE]: {
		label: "Date",
		placeholder: "Date",
		required: false
	}
}

export { FormFieldDefaults }
