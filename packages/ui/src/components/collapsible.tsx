"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// #region Collapsible

type CollapsibleProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>
const Collapsible = ({ ...props }: CollapsibleProps) => {
	return (
		<CollapsiblePrimitive.Root
			data-slot="collapsible"
			{...props}
		/>
	)
}

// #region CollapsibleTrigger

type CollapsibleTriggerProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
const CollapsibleTrigger = ({ ...props }: CollapsibleTriggerProps) => {
	return (
		<CollapsiblePrimitive.CollapsibleTrigger
			data-slot="collapsible-trigger"
			{...props}
		/>
	)
}

// #region CollapsibleContent

type CollapsibleContentProps = React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
const CollapsibleContent = ({ ...props }: CollapsibleContentProps) => {
	return (
		<CollapsiblePrimitive.CollapsibleContent
			data-slot="collapsible-content"
			{...props}
		/>
	)
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
