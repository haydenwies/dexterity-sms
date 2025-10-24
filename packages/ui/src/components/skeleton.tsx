import { cn } from "@dexterity-sms/ui/lib/utils"

type SkeletonProps = React.ComponentProps<"div">
const Skeleton = ({ className, ...props }: SkeletonProps) => {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-accent animate-pulse rounded-md", className)}
			{...props}
		/>
	)
}

export { Skeleton }
