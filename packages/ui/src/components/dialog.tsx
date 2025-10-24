"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@dexterity-sms/ui/lib/utils"

// #region Dialog

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>
const Dialog = ({ ...props }: DialogProps) => {
	return (
		<DialogPrimitive.Root
			data-slot="dialog"
			{...props}
		/>
	)
}

// #region DialogTrigger

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>
const DialogTrigger = ({ ...props }: DialogTriggerProps) => {
	return (
		<DialogPrimitive.Trigger
			data-slot="dialog-trigger"
			{...props}
		/>
	)
}

// #region DialogPortal

type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>
const DialogPortal = ({ ...props }: DialogPortalProps) => {
	return (
		<DialogPrimitive.Portal
			data-slot="dialog-portal"
			{...props}
		/>
	)
}

// #region DialogClose

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>
const DialogClose = ({ ...props }: DialogCloseProps) => {
	return (
		<DialogPrimitive.Close
			data-slot="dialog-close"
			{...props}
		/>
	)
}

// #region DialogOverlay

type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>
const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				className
			)}
			{...props}
		/>
	)
}

// #region DialogContent

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }
const DialogContent = ({
	children,
	className,
	onOpenAutoFocus,
	showCloseButton = true,
	...props
}: DialogContentProps) => {
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
					className
				)}
				onOpenAutoFocus={onOpenAutoFocus || ((e) => e.preventDefault())}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
					>
						<XIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}

// #region DialogHeader

type DialogHeaderProps = React.ComponentProps<"div">
const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
			{...props}
		/>
	)
}

// #region DialogFooter

type DialogFooterProps = React.ComponentProps<"div">
const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
			{...props}
		/>
	)
}

// #region DialogTitle

type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>
const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("text-lg font-semibold leading-none", className)}
			{...props}
		/>
	)
}

// #region DialogDescription

type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>
const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger
}
