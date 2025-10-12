"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@repo/ui/components/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui/components/collapsible"
import { Icon, IconName } from "@repo/ui/components/icon"
import * as SidebarPrimitive from "@repo/ui/components/sidebar"

import {
	getSidebarItems,
	type SidebarItemFolder as SidebarItemFolderType,
	type SidebarItemLink as SidebarItemLinkType,
	SidebarItemType
} from "~/components/sidebar/items"
import { useStreamTotalUnreadCount } from "~/data/conversation/use-stream-total-unread-count"

const isPathActive = (pathname: string, itemHref: string): boolean => {
	// Exact match for the item href
	if (pathname === itemHref) return true

	// For nested routes, check if pathname starts with itemHref
	// But only for routes that are deep enough to have sub-pages
	// This prevents /organizations/123 from matching /organizations/123/campaigns
	if (pathname.startsWith(itemHref + "/")) {
		// Count path segments to determine if this is a valid parent route
		const hrefSegments = itemHref.split("/").filter(Boolean).length

		// Only allow prefix matching for routes with 3+ segments
		// e.g., /organizations/123/campaigns (3 segments) can match /organizations/123/campaigns/456
		// but /organizations/123 (2 segments) won't match other routes
		return hrefSegments >= 3
	}

	return false
}

type SidebarItemLinkProps = SidebarItemLinkType & {
	pathname: string
}
const SidebarItemLink = ({ pathname, ...item }: SidebarItemLinkProps) => {
	const isActive = isPathActive(pathname, item.href)

	return (
		<SidebarPrimitive.SidebarMenuItem key={item.title}>
			<SidebarPrimitive.SidebarMenuButton
				asChild
				isActive={isActive}
				tooltip={item.title}
			>
				<Link href={item.href}>
					{item.icon && <Icon name={item.icon} />}
					<span>{item.title}</span>
					{item.badge !== undefined && item.badge > 0 && (
						<Badge
							variant="default"
							className="ml-auto rounded-full px-2 py-0.5 text-xs"
						>
							{item.badge > 99 ? "99+" : item.badge}
						</Badge>
					)}
				</Link>
			</SidebarPrimitive.SidebarMenuButton>
		</SidebarPrimitive.SidebarMenuItem>
	)
}

type SidebarItemFolderProps = SidebarItemFolderType & {
	pathname: string
}
const SidebarItemFolder = ({ pathname, ...item }: SidebarItemFolderProps) => {
	// Check if any child item is active
	const hasActiveChild = item.items.some((subItem) => isPathActive(pathname, subItem.href))

	return (
		<Collapsible
			className="group/collapsible"
			defaultOpen={hasActiveChild}
			key={item.title}
			title={item.title}
		>
			<SidebarPrimitive.SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarPrimitive.SidebarMenuButton isActive={hasActiveChild}>
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
					{item.items.map((subItem) => {
						const isActive = isPathActive(pathname, subItem.href)
						return (
							<SidebarPrimitive.SidebarMenuItem key={subItem.title}>
								<SidebarPrimitive.SidebarMenuSubButton
									asChild
									isActive={isActive}
								>
									<Link href={subItem.href}>
										{subItem.icon && <Icon name={subItem.icon} />}
										{subItem.title}
									</Link>
								</SidebarPrimitive.SidebarMenuSubButton>
							</SidebarPrimitive.SidebarMenuItem>
						)
					})}
				</SidebarPrimitive.SidebarMenuSub>
			</CollapsibleContent>
		</Collapsible>
	)
}

type SidebarContentProps = {
	organizationId: string
	initialUnreadCount: number
}
const SidebarContent = ({ organizationId, initialUnreadCount }: SidebarContentProps) => {
	const pathname = usePathname()
	const unreadCount = useStreamTotalUnreadCount(initialUnreadCount)
	const items = getSidebarItems(organizationId)

	// Update the Conversations item with the unread count badge
	const itemsWithBadge = items.map((item) => {
		if (item.type === SidebarItemType.LINK && item.title === "Conversations") {
			return { ...item, badge: unreadCount }
		}
		return item
	})

	return (
		<SidebarPrimitive.SidebarContent>
			<SidebarPrimitive.SidebarGroup>
				<SidebarPrimitive.SidebarGroupContent>
					<SidebarPrimitive.SidebarMenu>
						{itemsWithBadge.map((item) => {
							if (item.type === SidebarItemType.LINK)
								return (
									<SidebarItemLink
										key={item.title}
										pathname={pathname}
										{...item}
									/>
								)
							if (item.type === SidebarItemType.FOLDER)
								return (
									<SidebarItemFolder
										key={item.title}
										pathname={pathname}
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
