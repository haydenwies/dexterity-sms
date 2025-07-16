"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@repo/ui/lib/utils"

// #region Sheet

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>
const Sheet = ({ ...props }: SheetProps) => {
	return (
		<SheetPrimitive.Root
			data-slot="sheet"
			{...props}
		/>
	)
}

// #region SheetTrigger

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>
const SheetTrigger = ({ ...props }: SheetTriggerProps) => {
	return (
		<SheetPrimitive.Trigger
			data-slot="sheet-trigger"
			{...props}
		/>
	)
}

// #region SheetClose

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>
const SheetClose = ({ ...props }: SheetCloseProps) => {
	return (
		<SheetPrimitive.Close
			data-slot="sheet-close"
			{...props}
		/>
	)
}

// #region SheetPortal

type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>
const SheetPortal = ({ ...props }: SheetPortalProps) => {
	return (
		<SheetPrimitive.Portal
			data-slot="sheet-portal"
			{...props}
		/>
	)
}

// #region SheetOverlay

type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>
const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
				className
			)}
			{...props}
		/>
	)
}

// #region SheetContent

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: "top" | "right" | "bottom" | "left"
}
const SheetContent = ({ className, children, side = "right", ...props }: SheetContentProps) => {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot="sheet-content"
				className={cn(
					"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
					side === "right" &&
						"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
					side === "left" &&
						"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
					side === "top" &&
						"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
					side === "bottom" &&
						"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
					className
				)}
				{...props}
			>
				{children}
				<SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
					<XIcon className="size-4" />
					<span className="sr-only">Close</span>
				</SheetPrimitive.Close>
			</SheetPrimitive.Content>
		</SheetPortal>
	)
}

// #region SheetHeader

type SheetHeaderProps = React.ComponentProps<"div">
const SheetHeader = ({ className, ...props }: SheetHeaderProps) => {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex flex-col gap-1.5 p-4", className)}
			{...props}
		/>
	)
}

// #region SheetFooter

type SheetFooterProps = React.ComponentProps<"div">
const SheetFooter = ({ className, ...props }: SheetFooterProps) => {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	)
}

// #region SheetTitle

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>
const SheetTitle = ({ className, ...props }: SheetTitleProps) => {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("text-foreground font-semibold", className)}
			{...props}
		/>
	)
}

// #region SheetDescription

type SheetDescriptionProps = React.ComponentProps<typeof SheetPrimitive.Description>
const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
