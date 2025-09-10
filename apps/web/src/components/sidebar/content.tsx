import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui/components/collapsible"
import { Icon, IconName } from "@repo/ui/components/icon"
import * as SidebarPrimitive from "@repo/ui/components/sidebar"
import Link from "next/link"

import {
	getSidebarItems,
	type SidebarItemFolder as SidebarItemFolderType,
	type SidebarItemLink as SidebarItemLinkType,
	SidebarItemType
} from "~/components/sidebar/items"

const SidebarItemLink = (item: SidebarItemLinkType) => {
	return (
		<SidebarPrimitive.SidebarMenuItem key={item.title}>
			<SidebarPrimitive.SidebarMenuButton
				asChild
				tooltip={item.title}
			>
				<Link href={item.href}>
					{item.icon && <Icon name={item.icon} />}
					{item.title}
				</Link>
			</SidebarPrimitive.SidebarMenuButton>
		</SidebarPrimitive.SidebarMenuItem>
	)
}

const SidebarItemFolder = (item: SidebarItemFolderType) => {
	return (
		<Collapsible
			className="group/collapsible"
			defaultOpen={true}
			key={item.title}
			title={item.title}
		>
			<SidebarPrimitive.SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarPrimitive.SidebarMenuButton>
						{item.icon && <Icon name={item.icon} />}
						{item.title}
						<Icon
							className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
							name={IconName.CHEVRON_RIGHT}
						/>
					</SidebarPrimitive.SidebarMenuButton>
				</CollapsibleTrigger>
			</SidebarPrimitive.SidebarMenuItem>
			<CollapsibleContent>
				<SidebarPrimitive.SidebarMenuSub>
					{item.items.map((subItem) => (
						<SidebarPrimitive.SidebarMenuItem key={subItem.title}>
							<SidebarPrimitive.SidebarMenuButton asChild>
								<Link href={subItem.href}>
									{subItem.icon && <Icon name={subItem.icon} />}
									{subItem.title}
								</Link>
							</SidebarPrimitive.SidebarMenuButton>
						</SidebarPrimitive.SidebarMenuItem>
					))}
				</SidebarPrimitive.SidebarMenuSub>
			</CollapsibleContent>
		</Collapsible>
	)
}

type SidebarContentProps = {
	organizationId: string
}
const SidebarContent = ({ organizationId }: SidebarContentProps) => {
	const items = getSidebarItems(organizationId)

	return (
		<SidebarPrimitive.SidebarContent>
			<SidebarPrimitive.SidebarGroup>
				<SidebarPrimitive.SidebarGroupContent>
					<SidebarPrimitive.SidebarMenu>
						{items.map((item) => {
							if (item.type === SidebarItemType.LINK)
								return (
									<SidebarItemLink
										key={item.title}
										{...item}
									/>
								)
							if (item.type === SidebarItemType.FOLDER)
								return (
									<SidebarItemFolder
										key={item.title}
										{...item}
									/>
								)
						})}
					</SidebarPrimitive.SidebarMenu>
				</SidebarPrimitive.SidebarGroupContent>
			</SidebarPrimitive.SidebarGroup>
		</SidebarPrimitive.SidebarContent>
	)
}

export { SidebarContent }
