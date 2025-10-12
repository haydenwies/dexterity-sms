"use client"

import Link from "next/link"

import { type UserDto } from "@repo/types/auth"
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"
import * as SidebarPrimitive from "@repo/ui/components/sidebar"

import { routes } from "@repo/routes"
import { OrganizationModel } from "@repo/types/organization"
import { usePathname } from "next/navigation"
import { use } from "react"
import { signOut } from "~/actions/auth/sign-out"
import { isPathActive } from "./utils"

type SidebarFooterProps = Readonly<{
	organizationPromise: Promise<OrganizationModel>
	userPromise: Promise<UserDto>
}>

const SidebarFooter = ({ organizationPromise, userPromise }: SidebarFooterProps) => {
	const organization = use(organizationPromise)
	const user = use(userPromise)

	const pathname = usePathname()

	const { isMobile, open, toggleSidebar } = SidebarPrimitive.useSidebar()

	return (
		<SidebarPrimitive.SidebarFooter>
			<SidebarPrimitive.SidebarMenu>
				<SidebarPrimitive.SidebarMenuItem>
					<SidebarPrimitive.SidebarMenuButton
						asChild
						isActive={isPathActive(pathname, routes.web.SETTINGS(organization.id))}
						tooltip="Settings"
					>
						<Link href={routes.web.SETTINGS(organization.id)}>
							<Icon name={IconName.SETTINGS} />
							Settings
						</Link>
					</SidebarPrimitive.SidebarMenuButton>
				</SidebarPrimitive.SidebarMenuItem>
				<SidebarPrimitive.SidebarMenuItem>
					<SidebarPrimitive.SidebarMenuButton
						onClick={toggleSidebar}
						tooltip={open ? "Collapse" : "Expand"}
					>
						<Icon name={open ? IconName.PANEL_LEFT_CLOSE : IconName.PANEL_LEFT_OPEN} />
						{open && "Collapse"}
					</SidebarPrimitive.SidebarMenuButton>
				</SidebarPrimitive.SidebarMenuItem>
				<SidebarPrimitive.SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarPrimitive.SidebarMenuButton
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								size="lg"
							>
								<Avatar>
									<AvatarFallback className="bg-sidebar-background">
										<Icon name={IconName.USER} />
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left leading-tight">
									<span className="truncate font-medium">
										{user.firstName} {user.lastName}
									</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
								<Icon
									className="ml-auto"
									name={IconName.CHEVRON_RIGHT}
								/>
							</SidebarPrimitive.SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width)"
							align="end"
							side={isMobile ? "bottom" : "right"}
						>
							<DropdownMenuItem onClick={signOut}>
								<Icon name={IconName.LOG_OUT} />
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarPrimitive.SidebarMenuItem>
			</SidebarPrimitive.SidebarMenu>
		</SidebarPrimitive.SidebarFooter>
	)
}

export { SidebarFooter }
