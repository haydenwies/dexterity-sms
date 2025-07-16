"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@repo/ui/lib/utils"

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>
const Separator = ({ className, orientation = "horizontal", decorative = true, ...props }: SeparatorProps) => {
	return (
		<SeparatorPrimitive.Root
			data-slot="separator"
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
				className
			)}
			{...props}
		/>
	)
}

export { Separator }
