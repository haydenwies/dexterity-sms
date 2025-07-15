"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues
} from "react-hook-form"

import { cn } from "@repo/ui/lib/utils"
import { Label } from "@repo/ui/components/label"

// #region Form

const Form = FormProvider

// #region FormFieldContext

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

// #region FormField

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	)
}

// #region useFormField

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext)
	const itemContext = React.useContext(FormItemContext)
	const { getFieldState } = useFormContext()
	const formState = useFormState({ name: fieldContext.name })
	const fieldState = getFieldState(fieldContext.name, formState)

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>")
	}

	const { id } = itemContext

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	}
}

// #region FormItemContext

type FormItemContextValue = {
	id: string
}
const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

// #region FormItem

type FormItemProps = React.ComponentProps<"div">
const FormItem = ({ className, ...props }: FormItemProps) => {
	const id = React.useId()

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	)
}

// #region FormLabel

type FormLabelProps = React.ComponentProps<typeof LabelPrimitive.Root>
const FormLabel = ({ className, ...props }: FormLabelProps) => {
	const { error, formItemId } = useFormField()

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}

// #region FormControl

type FormControlProps = React.ComponentProps<typeof Slot>
const FormControl = ({ ...props }: FormControlProps) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
			aria-invalid={!!error}
			{...props}
		/>
	)
}

// #region FormDescription

type FormDescriptionProps = React.ComponentProps<"p">
const FormDescription = ({ className, ...props }: FormDescriptionProps) => {
	const { formDescriptionId } = useFormField()

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

// #region FormMessage

type FormMessageProps = React.ComponentProps<"p">
const FormMessage = ({ className, ...props }: FormMessageProps) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message ?? "") : props.children

	if (!body) return null

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn("text-destructive text-sm", className)}
			{...props}
		>
			{body}
		</p>
	)
}

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
