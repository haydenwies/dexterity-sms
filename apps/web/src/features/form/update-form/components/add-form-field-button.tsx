"use client"

import { Button } from "@repo/ui/components/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"

import { formFieldOptions } from "~/features/form/update-form/components/form-field-options"
import { useUpdateForm } from "~/features/form/update-form/hooks/use-update-form"
import { FormFieldType } from "~/types/form.types"

type Props = {
	index: number
}

const AddFormFieldButton = ({ index }: Props) => {
	const { handleAddFormField } = useUpdateForm()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
				>
					<Icon name={IconName.PLUS} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center">
				{Object.entries(formFieldOptions).map(([key, value]) => (
					<DropdownMenuItem
						key={key}
						onClick={() => handleAddFormField(index + 1, key as FormFieldType)}
					>
						<Icon name={value.iconName} />
						<p>{value.label}</p>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { AddFormFieldButton }
