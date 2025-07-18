"use client"

import { cn } from "@repo/ui/lib/utils"

import { useUpdateForm } from "~/features/form/update-form/hooks/use-update-form"
import { AddFormFieldButton } from "~/features/form/update-form/components/add-form-field-button"
import { FormFieldBlock } from "~/features/form/update-form/components/form-field-block"

type Props = {
	className?: string
}

const FormFieldList = ({ className }: Props) => {
	const { updateFormFormValues } = useUpdateForm()

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<AddFormFieldButton index={0} />
			{updateFormFormValues.fields.map((field, i) => (
				<div
					key={field.id}
					className="flex w-full flex-col items-center gap-2"
				>
					<FormFieldBlock
						className="w-full"
						fieldId={field.id}
					/>
					<AddFormFieldButton index={i + 1} />
				</div>
			))}
		</div>
	)
}

export { FormFieldList }
