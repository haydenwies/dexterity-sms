"use client"

import { TagModel } from "@repo/types/contact"
import { Badge } from "@repo/ui/components/badge"
import { Icon, IconName } from "@repo/ui/components/icon"

type Props = {
	tag: TagModel
	removable?: boolean
	onRemove?: () => void
}

const ContactTagBadge = ({ tag, removable = false, onRemove }: Props) => {
	return (
		<Badge
			className="text-foreground"
			key={tag.id}
			style={{ backgroundColor: `${tag.color}30` }}
		>
			<div
				style={{ backgroundColor: tag.color }}
				className="size-2 rounded-full"
			/>
			{tag.name}
			{removable && (
				<button
					className="hover:text-foreground/80 hover:cursor-pointer"
					onClick={onRemove}
				>
					<Icon
						name={IconName.X}
						className="ml-1 size-3"
					/>
				</button>
			)}
		</Badge>
	)
}

export { ContactTagBadge }
