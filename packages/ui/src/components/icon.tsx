import { cn } from "@repo/ui/lib/utils"
import * as IconsPrimitive from "lucide-react"

enum IconName {
	BUILDING = "building",
	CHEVRON_RIGHT = "chevron-right",
	CHEVRONS_UP_DOWN = "chevrons-up-down",
	CONTACTS = "users",
	CREATE = "create",
	EDIT = "edit",
	ELLIPSIS = "ellipsis",
	FILE_UPLOAD = "file-upload",
	HOME = "home",
	LOG_OUT = "log-out",
	MEGAPHONE = "megaphone",
	MESSAGE = "message-circle",
	PLUS = "plus",
	RESET = "reset",
	SAVE = "save",
	SETTINGS = "settings",
	SPINNER = "spinner",
	SQUIRREL = "squirrel",
	TRASH = "trash",
	USER = "user"
}

const iconVariants = {
	[IconName.BUILDING]: IconsPrimitive.Building,
	[IconName.CHEVRON_RIGHT]: IconsPrimitive.ChevronRight,
	[IconName.CHEVRONS_UP_DOWN]: IconsPrimitive.ChevronsUpDown,
	[IconName.CONTACTS]: IconsPrimitive.Users,
	[IconName.CREATE]: IconsPrimitive.Pen,
	[IconName.EDIT]: IconsPrimitive.SquarePen,
	[IconName.ELLIPSIS]: IconsPrimitive.Ellipsis,
	[IconName.FILE_UPLOAD]: IconsPrimitive.FileUp,
	[IconName.HOME]: IconsPrimitive.Home,
	[IconName.LOG_OUT]: IconsPrimitive.LogOut,
	[IconName.MEGAPHONE]: IconsPrimitive.Megaphone,
	[IconName.MESSAGE]: IconsPrimitive.MessageCircle,
	[IconName.PLUS]: IconsPrimitive.Plus,
	[IconName.RESET]: IconsPrimitive.RotateCcw,
	[IconName.SAVE]: IconsPrimitive.Save,
	[IconName.SETTINGS]: IconsPrimitive.Settings,
	[IconName.SPINNER]: IconsPrimitive.LoaderCircle,
	[IconName.SQUIRREL]: IconsPrimitive.Squirrel,
	[IconName.TRASH]: IconsPrimitive.Trash2,
	[IconName.USER]: IconsPrimitive.User
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
