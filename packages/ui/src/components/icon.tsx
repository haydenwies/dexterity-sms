import * as IconsPrimitive from "lucide-react"
import { cn } from "@repo/ui/lib/utils"

enum IconName {
	BUILDING = "building",
	CALENDAR = "calendar",
	CHEVRON_LEFT = "chevron-left",
	CHEVRON_RIGHT = "chevron-right",
	CHEVRONS_UP_DOWN = "chevrons-up-down",
	EMAIL = "mail",
	EYE = "eye",
	FORM = "notebook-pen",
	HOME = "home",
	LOG_OUT = "log-out",
	LONG_TEXT = "long-text",
	PHONE = "phone",
	PLUS = "plus",
	SETTINGS = "settings",
	SPINNER = "spinner",
	SHORT_TEXT = "short-text",
	SQUIRREL = "squirrel",
	TRASH = "trash",
	USER = "user",
	USERS = "users"
}

const iconVariants = {
	[IconName.BUILDING]: IconsPrimitive.Building,
	[IconName.CALENDAR]: IconsPrimitive.Calendar,
	[IconName.CHEVRON_LEFT]: IconsPrimitive.ChevronLeft,
	[IconName.CHEVRON_RIGHT]: IconsPrimitive.ChevronRight,
	[IconName.CHEVRONS_UP_DOWN]: IconsPrimitive.ChevronsUpDown,
	[IconName.EMAIL]: IconsPrimitive.Mail,
	[IconName.EYE]: IconsPrimitive.Eye,
	[IconName.FORM]: IconsPrimitive.NotebookPen,
	[IconName.HOME]: IconsPrimitive.Home,
	[IconName.LOG_OUT]: IconsPrimitive.LogOut,
	[IconName.LONG_TEXT]: IconsPrimitive.Text,
	[IconName.PHONE]: IconsPrimitive.Phone,
	[IconName.PLUS]: IconsPrimitive.Plus,
	[IconName.SETTINGS]: IconsPrimitive.Settings,
	[IconName.SHORT_TEXT]: IconsPrimitive.Type,
	[IconName.SPINNER]: IconsPrimitive.LoaderCircle,
	[IconName.SQUIRREL]: IconsPrimitive.Squirrel,
	[IconName.TRASH]: IconsPrimitive.Trash2,
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
