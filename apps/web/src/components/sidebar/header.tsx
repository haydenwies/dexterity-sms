"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu"
import { Icon, IconName } from "@repo/ui/components/icon"
import * as SidebarPrimitive from "@repo/ui/components/sidebar"
import Link from "next/link"
import { routes } from "~/lib/routes"

const SidebarHeader = () => {
	const { isMobile } = SidebarPrimitive.useSidebar()

	return (
		<SidebarPrimitive.SidebarHeader>
			<SidebarPrimitive.SidebarMenu>
				<SidebarPrimitive.SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarPrimitive.SidebarMenuButton
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								size="lg"
							>
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Icon name={IconName.BUILDING} />
								</div>
								<span className="font-medium">Organization name</span>
								<Icon
									className="ml-auto"
									name={IconName.CHEVRONS_UP_DOWN}
								/>
							</SidebarPrimitive.SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width)"
							align="start"
							side={isMobile ? "bottom" : "right"}
						>
							<DropdownMenuLabel>Organizations</DropdownMenuLabel>
							<DropdownMenuItem>Organization 1</DropdownMenuItem>
							<DropdownMenuItem>Organization 2</DropdownMenuItem>
							<DropdownMenuItem>Organization 3</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={routes.ALL_ORGANIZATIONS}>View all organizations</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarPrimitive.SidebarMenuItem>
			</SidebarPrimitive.SidebarMenu>
		</SidebarPrimitive.SidebarHeader>
	)
}

export { SidebarHeader }
