import { IconName } from "@repo/ui/components/icon"

import { routes } from "~/lib/routes"

enum SidebarItemType {
	LINK = "link",
	FOLDER = "folder"
}

type SidebarItemLink = {
	type: SidebarItemType.LINK
	title: string
	href: string
	icon?: IconName
}

type SidebarItemFolder = {
	type: SidebarItemType.FOLDER
	title: string
	icon?: IconName
	items: SidebarItemLink[]
}

const getSidebarItems = (): (SidebarItemLink | SidebarItemFolder)[] => {
	return [
		{
			type: SidebarItemType.LINK,
			title: "Home",
			href: routes.HOME("123"),
			icon: IconName.HOME
		},
		{
			type: SidebarItemType.LINK,
			title: "Campaigns",
			href: routes.ALL_CAMPAIGNS("123"),
			icon: IconName.MEGAPHONE
		},
		{
			type: SidebarItemType.LINK,
			title: "Messages",
			href: routes.ALL_MESSAGES("123"),
			icon: IconName.MESSAGE
		},
		{
			type: SidebarItemType.LINK,
			title: "Contacts",
			icon: IconName.USERS,
			href: routes.ALL_CONTACTS("123")
		}
	]
}

export { getSidebarItems, SidebarItemType, type SidebarItemFolder, type SidebarItemLink }
