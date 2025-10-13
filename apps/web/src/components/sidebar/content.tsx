"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { use, useState } from "react"

import { routes } from "@repo/routes"
import { type OrganizationModel } from "@repo/types/organization"
import { Badge } from "@repo/ui/components/badge"
import { Icon, IconName } from "@repo/ui/components/icon"
import * as SidebarPrimitive from "@repo/ui/components/sidebar"

import { isPathActive } from "~/components/sidebar/utils"
import { streamManyConversationsUnreadCount } from "~/data/conversation/stream-many-conversations-unread-count"
import { useSse } from "~/hooks/use-sse"

type SidebarContentProps = Readonly<{
	organizationPromise: Promise<OrganizationModel>
	conversationUnreadCountPromise: Promise<{ count: number }>
}>

const SidebarContent = ({ organizationPromise, conversationUnreadCountPromise }: SidebarContentProps) => {
	const organization = use(organizationPromise)
	const initialConversationUnreadCount = use(conversationUnreadCountPromise)

	const pathname = usePathname()

	const [conversationUnreadCount, setConversationUnreadCount] = useState<number>(initialConversationUnreadCount.count)
	useSse<{ count: number }>(() => streamManyConversationsUnreadCount(organization.id), {
		onMessage: (data) => {
			setConversationUnreadCount(data.count)
		}
	})

	// const conversationUnreadCount = useStreamTotalUnreadCount(initialConversationUnreadCount.count)

	return (
		<SidebarPrimitive.SidebarContent>
			<SidebarPrimitive.SidebarGroup>
				<SidebarPrimitive.SidebarGroupContent>
					<SidebarPrimitive.SidebarMenu>
						<SidebarPrimitive.SidebarMenuItem>
							<SidebarPrimitive.SidebarMenuButton
								asChild
								isActive={isPathActive(pathname, routes.web.HOME(organization.id))}
								tooltip="Home"
							>
								<Link href={routes.web.HOME(organization.id)}>
									<Icon name={IconName.HOME} />
									Home
								</Link>
							</SidebarPrimitive.SidebarMenuButton>
						</SidebarPrimitive.SidebarMenuItem>
						<SidebarPrimitive.SidebarMenuItem>
							<SidebarPrimitive.SidebarMenuButton
								asChild
								isActive={isPathActive(pathname, routes.web.ALL_CAMPAIGNS(organization.id))}
								tooltip="Campaigns"
							>
								<Link href={routes.web.ALL_CAMPAIGNS(organization.id)}>
									<Icon name={IconName.MEGAPHONE} />
									Campaigns
								</Link>
							</SidebarPrimitive.SidebarMenuButton>
						</SidebarPrimitive.SidebarMenuItem>
						<SidebarPrimitive.SidebarMenuItem>
							<SidebarPrimitive.SidebarMenuButton
								asChild
								isActive={isPathActive(pathname, routes.web.ALL_CONVERSATIONS(organization.id))}
								tooltip="Conversations"
							>
								<Link href={routes.web.ALL_CONVERSATIONS(organization.id)}>
									<Icon name={IconName.MESSAGE} />
									Conversations
									{conversationUnreadCount > 0 && (
										<Badge
											variant="default"
											className="ml-auto rounded-full px-2 py-0.5 text-xs"
										>
											{conversationUnreadCount > 99 ? "99+" : conversationUnreadCount}
										</Badge>
									)}
								</Link>
							</SidebarPrimitive.SidebarMenuButton>
						</SidebarPrimitive.SidebarMenuItem>
						<SidebarPrimitive.SidebarMenuItem>
							<SidebarPrimitive.SidebarMenuButton
								asChild
								isActive={isPathActive(pathname, routes.web.ALL_CONTACTS(organization.id))}
								tooltip="Contacts"
							>
								<Link href={routes.web.ALL_CONTACTS(organization.id)}>
									<Icon name={IconName.USERS} />
									Contacts
								</Link>
							</SidebarPrimitive.SidebarMenuButton>
						</SidebarPrimitive.SidebarMenuItem>
					</SidebarPrimitive.SidebarMenu>
				</SidebarPrimitive.SidebarGroupContent>
			</SidebarPrimitive.SidebarGroup>
		</SidebarPrimitive.SidebarContent>
	)
}

export { SidebarContent }
