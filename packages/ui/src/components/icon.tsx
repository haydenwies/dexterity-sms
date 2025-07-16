import * as IconsPrimitive from "lucide-react"
import { cn } from "@repo/ui/lib/utils"

enum IconName {
	BUILDING = "building",
	CHEVRON_RIGHT = "chevron-right",
	CHEVRONS_UP_DOWN = "chevrons-up-down",
	FORM = "notebook-pen",
	HOME = "home",
	LOG_OUT = "log-out",
	SQUIRREL = "squirrel",
	USER = "user",
	USERS = "users"
}

const iconVariants = {
	[IconName.BUILDING]: IconsPrimitive.Building,
	[IconName.CHEVRON_RIGHT]: IconsPrimitive.ChevronRight,
	[IconName.CHEVRONS_UP_DOWN]: IconsPrimitive.ChevronsUpDown,
	[IconName.FORM]: IconsPrimitive.NotebookPen,
	[IconName.HOME]: IconsPrimitive.Home,
	[IconName.LOG_OUT]: IconsPrimitive.LogOut,
	[IconName.SQUIRREL]: IconsPrimitive.Squirrel,
	[IconName.USER]: IconsPrimitive.User,
	[IconName.USERS]: IconsPrimitive.Users
}

type IconProps = React.ComponentProps<"svg"> & { name: IconName }
const Icon = ({ className, name, ...props }: IconProps) => {
	const Comp = iconVariants[name]

	return (
		<Comp
			className={cn("size-4", className)}
			{...props}
		/>
	)
}

export { Icon, IconName }
