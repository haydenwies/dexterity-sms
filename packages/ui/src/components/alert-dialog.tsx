"use client"

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import * as React from "react"

import { ButtonProps, buttonVariants } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"

type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>
const AlertDialog = ({ ...props }: AlertDialogProps) => {
	return (
		<AlertDialogPrimitive.Root
			data-slot="alert-dialog"
			{...props}
		/>
	)
}

type AlertDialogTriggerProps = React.ComponentProps<typeof AlertDialogPrimitive.Trigger>
const AlertDialogTrigger = ({ ...props }: AlertDialogTriggerProps) => {
	return (
		<AlertDialogPrimitive.Trigger
			data-slot="alert-dialog-trigger"
			{...props}
		/>
	)
}

type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPrimitive.Portal>
const AlertDialogPortal = ({ ...props }: AlertDialogPortalProps) => {
	return (
		<AlertDialogPrimitive.Portal
			data-slot="alert-dialog-portal"
			{...props}
		/>
	)
}

type AlertDialogOverlayProps = React.ComponentProps<typeof AlertDialogPrimitive.Overlay>
const AlertDialogOverlay = ({ className, ...props }: AlertDialogOverlayProps) => {
	return (
		<AlertDialogPrimitive.Overlay
			data-slot="alert-dialog-overlay"
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				className
			)}
			{...props}
		/>
	)
}

type AlertDialogContentProps = React.ComponentProps<typeof AlertDialogPrimitive.Content>
const AlertDialogContent = ({ className, onOpenAutoFocus, ...props }: AlertDialogContentProps) => {
	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-content"
				className={cn(
					"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
					className
				)}
				onOpenAutoFocus={onOpenAutoFocus || ((e) => e.preventDefault())}
				{...props}
			/>
		</AlertDialogPortal>
	)
}

type AlertDialogHeaderProps = React.ComponentProps<"div">
const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
			{...props}
		/>
	)
}

type AlertDialogFooterProps = React.ComponentProps<"div">
const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
			{...props}
		/>
	)
}

type AlertDialogTitleProps = React.ComponentProps<typeof AlertDialogPrimitive.Title>
const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn("text-lg font-semibold", className)}
			{...props}
		/>
	)
}

type AlertDialogDescriptionProps = React.ComponentProps<typeof AlertDialogPrimitive.Description>
const AlertDialogDescription = ({ className, ...props }: AlertDialogDescriptionProps) => {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

type AlertDialogActionProps = Omit<ButtonProps, "asChild" | "size">
const AlertDialogAction = ({ className, variant, ...props }: AlertDialogActionProps) => {
	return (
		<AlertDialogPrimitive.Action
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		/>
	)
}

type AlertDialogCancelProps = Omit<ButtonProps, "asChild" | "size">
const AlertDialogCancel = ({ className, variant = "outline", ...props }: AlertDialogCancelProps) => {
	return (
		<AlertDialogPrimitive.Cancel
			className={cn(buttonVariants({ variant }), className)}
			{...props}
		/>
	)
}

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger
}
