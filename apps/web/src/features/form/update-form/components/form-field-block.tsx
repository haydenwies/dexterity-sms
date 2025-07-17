import { cn } from "@repo/ui/lib/utils"
import { Label } from "@repo/ui/components/label"
import { Input } from "@repo/ui/components/input"
import { Textarea } from "@repo/ui/components/textarea"

import { type UpdateFormSchema } from "~/types/dtos/form/update-form.dto"
import { FormFieldType } from "~/types/form.types"

type Props = {
	className?: string
	formField: UpdateFormSchema["fields"][number]
}

const FormFieldBlock = ({ className, formField }: Props) => {
	return (
		<div className={cn("border-border flex flex-col gap-2 rounded-md border p-4", className)}>
			<Label>{formField.label}</Label>
			{formField.type === FormFieldType.SHORT_TEXT ? (
				<Input placeholder={formField.placeholder} />
			) : formField.type === FormFieldType.LONG_TEXT ? (
				<Textarea placeholder={formField.placeholder} />
			) : formField.type === FormFieldType.EMAIL ? (
				<Input placeholder={formField.placeholder} />
			) : formField.type === FormFieldType.PHONE ? (
				<Input placeholder={formField.placeholder} />
			) : formField.type === FormFieldType.DATE ? (
				<Input placeholder={formField.placeholder} />
			) : null}
		</div>
	)
}

export { FormFieldBlock }
