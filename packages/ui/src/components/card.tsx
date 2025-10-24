import * as React from "react"

import { cn } from "@dexterity-sms/ui/lib/utils"

// #region Card

type CardProps = React.ComponentProps<"div">
const Card = ({ className, ...props }: CardProps) => {
	return (
		<div
			data-slot="card"
			className={cn(
				"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
				className
			)}
			{...props}
		/>
	)
}

// #region CardHeader

type CardHeaderProps = React.ComponentProps<"div">
const CardHeader = ({ className, ...props }: CardHeaderProps) => {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
				className
			)}
			{...props}
		/>
	)
}

// #region CardTitle

type CardTitleProps = React.ComponentProps<"div">
const CardTitle = ({ className, ...props }: CardTitleProps) => {
	return (
		<div
			data-slot="card-title"
			className={cn("font-semibold leading-none", className)}
			{...props}
		/>
	)
}

// #region CardDescription

type CardDescriptionProps = React.ComponentProps<"div">
const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

// #region CardAction

type CardActionProps = React.ComponentProps<"div">
const CardAction = ({ className, ...props }: CardActionProps) => {
	return (
		<div
			data-slot="card-action"
			className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
			{...props}
		/>
	)
}

// #region CardContent

type CardContentProps = React.ComponentProps<"div">
const CardContent = ({ className, ...props }: CardContentProps) => {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	)
}

// #region CardFooter

type CardFooterProps = React.ComponentProps<"div">
const CardFooter = ({ className, ...props }: CardFooterProps) => {
	return (
		<div
			data-slot="card-footer"
			className={cn("[.border-t]:pt-6 flex items-center px-6", className)}
			{...props}
		/>
	)
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
