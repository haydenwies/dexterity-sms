import * as IconsPrimitive from "lucide-react"

import { cn } from "@repo/ui/lib/utils"

enum IconName {
	ALERT_CIRCLE = "alert-circle",
	ARROW_LEFT = "arrow-left",
	ARROW_LEFT_RIGHT = "arrow-left-right",
	ARROW_RETURN = "arrow-return",
	ARROW_RIGHT = "arrow-right",
	ARROW_UP = "arrow-up",
	BRUSH_CLEANING = "brush-cleaning",
	BUILDING = "building",
	CALENDAR = "calendar",
	CALENDAR_X = "calendar-x",
	CHECK = "check",
	CHECK_CIRCLE = "check-circle",
	CHEVRON_DOWN = "chevron-down",
	CHEVRON_RIGHT = "chevron-right",
	CHEVRONS_UP_DOWN = "chevrons-up-down",
	CLOUD_ALERT = "cloud-alert",
	CLOUD_CHECK = "cloud-check",
	CREATE = "create",
	EDIT = "edit",
	ELLIPSIS = "ellipsis",
	FILE_UPLOAD = "file-upload",
	HOME = "home",
	LAPTOP = "laptop",
	LINK = "link",
	LOG_OUT = "log-out",
	MEGAPHONE = "megaphone",
	MESSAGE = "message-circle",
	MINUS = "minus",
	PANEL_LEFT_CLOSE = "panel-left-close",
	PANEL_LEFT_OPEN = "panel-left-open",
	PHONE = "phone",
	PLUS = "plus",
	RESET = "reset",
	SAVE = "save",
	SEND = "send",
	SETTINGS = "settings",
	SPINNER = "spinner",
	TAG = "tag",
	TEST_TUBE = "test-tube",
	TRASH = "trash",
	USER = "user",
	USERS = "users",
	X = "x"
}

const iconVariants: Record<IconName, IconsPrimitive.LucideIcon> = {
	[IconName.ALERT_CIRCLE]: IconsPrimitive.CircleAlert,
	[IconName.ARROW_LEFT]: IconsPrimitive.ArrowLeft,
	[IconName.ARROW_LEFT_RIGHT]: IconsPrimitive.ArrowLeftRight,
	[IconName.ARROW_RETURN]: IconsPrimitive.Undo2,
	[IconName.ARROW_RIGHT]: IconsPrimitive.ArrowRight,
	[IconName.ARROW_UP]: IconsPrimitive.ArrowUp,
	[IconName.BRUSH_CLEANING]: IconsPrimitive.BrushCleaning,
	[IconName.BUILDING]: IconsPrimitive.Building,
	[IconName.CALENDAR]: IconsPrimitive.Calendar,
	[IconName.CALENDAR_X]: IconsPrimitive.CalendarX,
	[IconName.CHECK]: IconsPrimitive.Check,
	[IconName.CHECK_CIRCLE]: IconsPrimitive.CheckCircle,
	[IconName.CHEVRON_DOWN]: IconsPrimitive.ChevronDown,
	[IconName.CHEVRON_RIGHT]: IconsPrimitive.ChevronRight,
	[IconName.CHEVRONS_UP_DOWN]: IconsPrimitive.ChevronsUpDown,
	[IconName.CLOUD_ALERT]: IconsPrimitive.CloudAlert,
	[IconName.CLOUD_CHECK]: IconsPrimitive.CloudCheck,
	[IconName.CREATE]: IconsPrimitive.Pen,
	[IconName.EDIT]: IconsPrimitive.SquarePen,
	[IconName.ELLIPSIS]: IconsPrimitive.Ellipsis,
	[IconName.FILE_UPLOAD]: IconsPrimitive.FileUp,
	[IconName.HOME]: IconsPrimitive.Home,
	[IconName.LAPTOP]: IconsPrimitive.LaptopMinimal,
	[IconName.LINK]: IconsPrimitive.Link,
	[IconName.LOG_OUT]: IconsPrimitive.LogOut,
	[IconName.MEGAPHONE]: IconsPrimitive.Megaphone,
	[IconName.MESSAGE]: IconsPrimitive.MessageCircle,
	[IconName.MINUS]: IconsPrimitive.Minus,
	[IconName.PANEL_LEFT_CLOSE]: IconsPrimitive.PanelLeftClose,
	[IconName.PANEL_LEFT_OPEN]: IconsPrimitive.PanelLeftOpen,
	[IconName.PHONE]: IconsPrimitive.Phone,
	[IconName.PLUS]: IconsPrimitive.Plus,
	[IconName.RESET]: IconsPrimitive.RotateCcw,
	[IconName.SAVE]: IconsPrimitive.Save,
	[IconName.SEND]: IconsPrimitive.Send,
	[IconName.SETTINGS]: IconsPrimitive.Settings,
	[IconName.SPINNER]: IconsPrimitive.LoaderCircle,
	[IconName.TAG]: IconsPrimitive.Tag,
	[IconName.TEST_TUBE]: IconsPrimitive.TestTubeDiagonal,
	[IconName.TRASH]: IconsPrimitive.Trash2,
	[IconName.USER]: IconsPrimitive.User,
	[IconName.USERS]: IconsPrimitive.Users,
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
