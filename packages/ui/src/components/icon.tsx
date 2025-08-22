import { cn } from "@repo/ui/lib/utils"
import * as IconsPrimitive from "lucide-react"

enum IconName {
	ARROW_LEFT = "arrow-left",
	ARROW_RIGHT = "arrow-right",
	BUILDING = "building",
	CALENDAR = "calendar",
	CHEVRON_DOWN = "chevron-down",
	CHEVRON_RIGHT = "chevron-right",
	CHEVRONS_UP_DOWN = "chevrons-up-down",
	CLOUD_ALERT = "cloud-alert",
	CLOUD_CHECK = "cloud-check",
	CONTACTS = "users",
	CREATE = "create",
	EDIT = "edit",
	ELLIPSIS = "ellipsis",
	FILE_UPLOAD = "file-upload",
	HOME = "home",
	LOG_OUT = "log-out",
	MEGAPHONE = "megaphone",
	MESSAGE = "message-circle",
	MINUS = "minus",
	PLUS = "plus",
	RESET = "reset",
	SAVE = "save",
	SEND = "send",
	SETTINGS = "settings",
	SPINNER = "spinner",
	SQUIRREL = "squirrel",
	TAG = "tag",
	TEST_TUBE = "test-tube",
	TRASH = "trash",
	USER = "user",
	X = "x"
}

const iconVariants = {
	[IconName.ARROW_LEFT]: IconsPrimitive.ArrowLeft,
	[IconName.ARROW_RIGHT]: IconsPrimitive.ArrowRight,
	[IconName.BUILDING]: IconsPrimitive.Building,
	[IconName.CALENDAR]: IconsPrimitive.Calendar,
	[IconName.CHEVRON_DOWN]: IconsPrimitive.ChevronDown,
	[IconName.CHEVRON_RIGHT]: IconsPrimitive.ChevronRight,
	[IconName.CHEVRONS_UP_DOWN]: IconsPrimitive.ChevronsUpDown,
	[IconName.CLOUD_ALERT]: IconsPrimitive.CloudAlert,
	[IconName.CLOUD_CHECK]: IconsPrimitive.CloudCheck,
	[IconName.CONTACTS]: IconsPrimitive.Users,
	[IconName.CREATE]: IconsPrimitive.Pen,
	[IconName.EDIT]: IconsPrimitive.SquarePen,
	[IconName.ELLIPSIS]: IconsPrimitive.Ellipsis,
	[IconName.FILE_UPLOAD]: IconsPrimitive.FileUp,
	[IconName.HOME]: IconsPrimitive.Home,
	[IconName.LOG_OUT]: IconsPrimitive.LogOut,
	[IconName.MEGAPHONE]: IconsPrimitive.Megaphone,
	[IconName.MESSAGE]: IconsPrimitive.MessageCircle,
	[IconName.MINUS]: IconsPrimitive.Minus,
	[IconName.PLUS]: IconsPrimitive.Plus,
	[IconName.RESET]: IconsPrimitive.RotateCcw,
	[IconName.SAVE]: IconsPrimitive.Save,
	[IconName.SEND]: IconsPrimitive.Send,
	[IconName.SETTINGS]: IconsPrimitive.Settings,
	[IconName.SPINNER]: IconsPrimitive.LoaderCircle,
	[IconName.SQUIRREL]: IconsPrimitive.Squirrel,
	[IconName.TAG]: IconsPrimitive.Tag,
	[IconName.TEST_TUBE]: IconsPrimitive.TestTubeDiagonal,
	[IconName.TRASH]: IconsPrimitive.Trash2,
	[IconName.USER]: IconsPrimitive.User,
	[IconName.X]: IconsPrimitive.X
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
