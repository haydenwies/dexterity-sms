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
		className={cn("sticky top-0", className)}
		{...props}
	/>
)

// #region PageHeaderRow

type PageHeaderRowProps = React.ComponentProps<"div">
const PageHeaderRow = ({ className, ...props }: PageHeaderRowProps) => (
	<div
		className={cn("relative flex h-16 flex-row items-center justify-between gap-4 px-6", className)}
		{...props}
	/>
)

// #region PageHeaderGroup

type PageHeaderGroupProps = React.ComponentProps<"div"> & { type?: "row" | "column" }
const PageHeaderGroup = ({ className, type = "row", ...props }: PageHeaderGroupProps) => (
	<div
		className={cn("flex flex-row items-center gap-2", { "flex-col": type === "column" }, className)}
		{...props}
	/>
)

// #region PageContent

type PageContentProps = React.ComponentProps<"div"> & { disableScroll?: boolean }
const PageContent = ({ className, disableScroll = false, ...props }: PageContentProps) => (
	<div
		className={cn("flex flex-1 flex-col px-6 py-4", { "overflow-y-hidden": disableScroll }, className)}
		{...props}
	/>
)

export { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow }
