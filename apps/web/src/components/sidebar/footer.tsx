"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"
import * as SidebarPrimitive from "@repo/ui/components/sidebar"
import Link from "next/link"
import { routes } from "~/lib/routes"

const SidebarFooter = () => {
	const { isMobile, open, toggleSidebar } = SidebarPrimitive.useSidebar()

	return (
		<SidebarPrimitive.SidebarFooter>
			<SidebarPrimitive.SidebarMenu>
				<SidebarPrimitive.SidebarMenuItem>
					<SidebarPrimitive.SidebarMenuButton
						asChild
						tooltip="Settings"
					>
						<Link href={routes.SETTINGS("123")}>
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
								<div className="border-sidebar-border flex aspect-square size-8 items-center justify-center rounded-lg border">
									<Icon
										name={IconName.USER}
										className="size-4"
									/>
								</div>
								<div className="grid flex-1 text-left leading-tight">
									<span className="truncate font-medium">User name</span>
									<span className="truncate text-xs">user@example.com</span>
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
							<DropdownMenuItem>
								<Icon name={IconName.LOG_OUT} />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarPrimitive.SidebarMenuItem>
			</SidebarPrimitive.SidebarMenu>
		</SidebarPrimitive.SidebarFooter>
	)
}

export { SidebarFooter }
