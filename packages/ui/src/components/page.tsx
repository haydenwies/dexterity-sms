import { cn } from "@repo/ui/lib/utils"

// #region Page

type PageProps = React.ComponentProps<"div">
const Page = ({ className, ...props }: PageProps) => {
	return (
		<div
			className={cn("mx-auto flex h-svh w-full flex-col", className)}
			{...props}
		/>
	)
}

// #region PageHeader

type PageHeaderProps = React.ComponentProps<"div">
const PageHeader = ({ className, ...props }: PageHeaderProps) => (
	<div
		className={cn("sticky top-0 p-8 pb-0", className)}
		{...props}
	/>
)

// #region PageHeaderRow

type PageHeaderRowProps = React.ComponentProps<"div">
const PageHeaderRow = ({ className, ...props }: PageHeaderRowProps) => (
	<div
		className={cn("relative flex flex-row items-start justify-between gap-4", className)}
		{...props}
	/>
)

// #region PageHeaderGroup

type PageHeaderGroupProps = React.ComponentProps<"div"> & { type?: "row" | "column" }
const PageHeaderGroup = ({ className, type = "row", ...props }: PageHeaderGroupProps) => (
	<div
		className={cn("flex flex-row items-start gap-2", { "flex-col": type === "column" }, className)}
		{...props}
	/>
)

// #region PageContent

type PageContentProps = React.ComponentProps<"div">
const PageContent = ({ className, ...props }: PageContentProps) => (
	<div
		className={cn("flex flex-1 flex-col overflow-y-auto p-8", className)}
		{...props}
	/>
)

export { Page, PageHeader, PageHeaderRow, PageHeaderGroup, PageContent }
