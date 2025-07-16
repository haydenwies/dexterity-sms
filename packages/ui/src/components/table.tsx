"use client"

import * as React from "react"

import { cn } from "@repo/ui/lib/utils"

// #region Table

type TableProps = React.ComponentProps<"table">
const Table = ({ className, ...props }: TableProps) => {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	)
}

// #region TableHeader

type TableHeaderProps = React.ComponentProps<"thead">
const TableHeader = ({ className, ...props }: TableHeaderProps) => {
	return (
		<thead
			data-slot="table-header"
			className={cn("[&_tr]:border-b", className)}
			{...props}
		/>
	)
}

// #region TableBody

type TableBodyProps = React.ComponentProps<"tbody">
const TableBody = ({ className, ...props }: TableBodyProps) => {
	return (
		<tbody
			data-slot="table-body"
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	)
}

// #region TableFooter

type TableFooterProps = React.ComponentProps<"tfoot">
const TableFooter = ({ className, ...props }: TableFooterProps) => {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
			{...props}
		/>
	)
}

// #region TableRow

type TableRowProps = React.ComponentProps<"tr">
const TableRow = ({ className, ...props }: TableRowProps) => {
	return (
		<tr
			data-slot="table-row"
			className={cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)}
			{...props}
		/>
	)
}

// #region TableHead

type TableHeadProps = React.ComponentProps<"th">
const TableHead = ({ className, ...props }: TableHeadProps) => {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"text-foreground h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className
			)}
			{...props}
		/>
	)
}

// #region TableCell

type TableCellProps = React.ComponentProps<"td">
const TableCell = ({ className, ...props }: TableCellProps) => {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className
			)}
			{...props}
		/>
	)
}

// #region TableCaption

type TableCaptionProps = React.ComponentProps<"caption">
const TableCaption = ({ className, ...props }: TableCaptionProps) => {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	)
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
