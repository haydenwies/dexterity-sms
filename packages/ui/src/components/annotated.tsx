import * as React from "react"

import { cn } from "@dexterity-sms/ui/lib/utils"

type AnnotatedProps = React.ComponentProps<"div">
const Annotated = ({ className, ...props }: AnnotatedProps) => {
	return (
		<div
			className={cn("space-y-6", className)}
			{...props}
		/>
	)
}

type AnnotatedSectionProps = React.ComponentProps<"div">
const AnnotatedSection = ({ className, ...props }: AnnotatedSectionProps) => {
	return (
		<div
			className={cn("grid grid-cols-1 gap-y-4 px-4 md:grid-cols-12 md:gap-x-8 lg:gap-x-12", className)}
			{...props}
		/>
	)
}

type AnnotatedHeaderProps = React.ComponentProps<"div">
const AnnotatedHeader = ({ className, ...props }: AnnotatedHeaderProps) => {
	return (
		<div
			className={cn("space-y-2 md:col-span-5", className)}
			{...props}
		/>
	)
}

type AnnotatedTitleProps = React.ComponentProps<"h2">
const AnnotatedTitle = ({ className, ...props }: AnnotatedTitleProps) => {
	return (
		<h2
			className={cn("text-sm font-semibold", className)}
			{...props}
		/>
	)
}

type AnnotatedDescriptionProps = React.ComponentProps<"p">
const AnnotatedDescription = ({ className, ...props }: AnnotatedDescriptionProps) => {
	return (
		<p
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

type AnnotatedContentProps = React.ComponentProps<"div">
const AnnotatedContent = ({ className, ...props }: AnnotatedContentProps) => {
	return (
		<div
			className={cn("md:col-span-7", className)}
			{...props}
		/>
	)
}

export { Annotated, AnnotatedContent, AnnotatedDescription, AnnotatedHeader, AnnotatedSection, AnnotatedTitle }
