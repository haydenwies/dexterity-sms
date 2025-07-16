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
			title: "Dashboard",
			href: routes.DASHBOARD("123"),
			icon: IconName.HOME
		},
		{
			type: SidebarItemType.FOLDER,
			title: "Contacts",
			icon: IconName.USERS,
			items: [
				{
					type: SidebarItemType.LINK,
					title: "All Contacts",
					href: routes.ALL_CONTACTS("123")
				}
			]
		},
		{
			type: SidebarItemType.LINK,
			title: "Forms",
			icon: IconName.FORM,
			href: routes.ALL_FORMS("123")
		}
	]
}

export { getSidebarItems, SidebarItemType, type SidebarItemLink, type SidebarItemFolder }
