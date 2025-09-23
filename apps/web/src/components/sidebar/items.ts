import { IconName } from "@repo/ui/components/icon"

import { routes } from "@repo/routes"
// import { routes } from "~/lib/routes"

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

const getSidebarItems = (organizationId: string): (SidebarItemLink | SidebarItemFolder)[] => {
	return [
		{
			type: SidebarItemType.LINK,
			title: "Home",
			href: routes.web.HOME(organizationId),
			icon: IconName.HOME
		},
		{
			type: SidebarItemType.LINK,
			title: "Campaigns",
			href: routes.web.ALL_CAMPAIGNS(organizationId),
			icon: IconName.MEGAPHONE
		},
		{
			type: SidebarItemType.LINK,
			title: "Conversations",
			href: routes.web.ALL_CONVERSATIONS(organizationId),
			icon: IconName.MESSAGE
		},
		{
			type: SidebarItemType.LINK,
			title: "Contacts",
			icon: IconName.USERS,
			href: routes.web.ALL_CONTACTS(organizationId)
		}
	]
}

export { getSidebarItems, SidebarItemType, type SidebarItemFolder, type SidebarItemLink }
