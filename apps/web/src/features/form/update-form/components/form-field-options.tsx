import { IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { Textarea } from "@repo/ui/components/textarea"

import { FormFieldType } from "~/types/form.types"

type FormFieldOption = {
	label: string
	iconName: IconName
	component: React.ComponentType
}

const formFieldOptions: Record<FormFieldType, FormFieldOption> = {
	[FormFieldType.SHORT_TEXT]: {
		label: "Short Text",
		iconName: IconName.SHORT_TEXT,
		component: Input
	},
	[FormFieldType.LONG_TEXT]: {
		label: "Long Text",
		iconName: IconName.LONG_TEXT,
		component: Textarea
	},
	[FormFieldType.EMAIL]: {
		label: "Email",
		iconName: IconName.EMAIL,
		component: Input
	},
	[FormFieldType.PHONE]: {
		label: "Phone",
		iconName: IconName.PHONE,
		component: Input
	},
	[FormFieldType.DATE]: {
		label: "Date",
		iconName: IconName.CALENDAR,
		component: Input
	}
}

export { formFieldOptions }
