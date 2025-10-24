import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@dexterity-sms/ui/lib/utils"

// #region Empty

type EmptyProps = React.ComponentProps<"div">
const Empty = ({ className, ...props }: EmptyProps) => {
	return (
		<div
			data-slot="empty"
			className={cn(
				"flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
				className
			)}
			{...props}
		/>
	)
}

// #endregion

// #region EmptyHeader

type EmptyHeaderProps = React.ComponentProps<"div">
const EmptyHeader = ({ className, ...props }: EmptyHeaderProps) => {
	return (
		<div
			data-slot="empty-header"
			className={cn("flex max-w-sm flex-col items-center gap-2 text-center", className)}
			{...props}
		/>
	)
}

// #endregion

// #region EmptyMedia

const emptyMediaVariants = cva(
	"flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
)
type EmptyMediaProps = React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>
const EmptyMedia = ({ className, variant = "default", ...props }: EmptyMediaProps) => {
	return (
		<div
			data-slot="empty-icon"
			data-variant={variant}
			className={cn(emptyMediaVariants({ variant, className }))}
			{...props}
		/>
	)
}

// #endregion

// #region EmptyTitle

type EmptyTitleProps = React.ComponentProps<"div">
const EmptyTitle = ({ className, ...props }: EmptyTitleProps) => {
	return (
		<div
			data-slot="empty-title"
			className={cn("text-lg font-medium tracking-tight", className)}
			{...props}
		/>
	)
}

// #endregion

// #region EmptyDescription

type EmptyDescriptionProps = React.ComponentProps<"p">
const EmptyDescription = ({ className, ...props }: EmptyDescriptionProps) => {
	return (
		<div
			data-slot="empty-description"
			className={cn(
				"text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
				className
			)}
			{...props}
		/>
	)
}

// #endregion

// #region EmptyContent

type EmptyContentProps = React.ComponentProps<"div">
const EmptyContent = ({ className, ...props }: EmptyContentProps) => {
	return (
		<div
			data-slot="empty-content"
			className={cn("flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm", className)}
			{...props}
		/>
	)
}

// #endregion

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle }
