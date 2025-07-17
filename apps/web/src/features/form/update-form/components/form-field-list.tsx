"use client"

import { useUpdateForm } from "~/features/form/update-form/hooks/use-update-form"
import { AddFormFieldButton } from "~/features/form/update-form/components/add-form-field-button"
import { FormFieldBlock } from "~/features/form/update-form/components/form-field-block"
import { cn } from "@repo/ui/lib/utils"

type Props = {
	className?: string
}

const FormFieldList = ({ className }: Props) => {
	const { updateFormFieldArray } = useUpdateForm()

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			{updateFormFieldArray.fields.map((field, i) => (
				<div
					key={field.id}
					className="flex flex-col items-center gap-2"
				>
					<FormFieldBlock
						className="bg-background w-full max-w-md"
						formField={field}
					/>
					<AddFormFieldButton index={i} />
				</div>
			))}
		</div>
	)
}

export { FormFieldList }
