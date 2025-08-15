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
			title: "Campaigns",
			icon: IconName.MEGAPHONE,
			items: [
				{
					type: SidebarItemType.LINK,
					title: "All Campaigns",
					href: routes.ALL_CAMPAIGNS("123")
				},
				{
					type: SidebarItemType.LINK,
					title: "Templates",
					href: routes.ALL_CAMPAIGN_TEMPLATES("123")
				},
				{
					type: SidebarItemType.LINK,
					title: "Settings",
					href: routes.ALL_CAMPAIGN_SETTINGS("123")
				}
			]
		},

		{
			type: SidebarItemType.FOLDER,
			title: "Contacts",
			icon: IconName.CONTACTS,
			items: [
				{
					type: SidebarItemType.LINK,
					title: "All Contacts",
					href: routes.ALL_CONTACTS("123")
				},
				{
					type: SidebarItemType.LINK,
					title: "Forms",
					href: routes.ALL_CONTACT_FORMS("123")
				}
			]
		},
		{
			type: SidebarItemType.LINK,
			title: "Messages",
			href: routes.ALL_MESSAGES("123"),
			icon: IconName.MESSAGE
		}
	]
}

export { getSidebarItems, SidebarItemType, type SidebarItemFolder, type SidebarItemLink }
