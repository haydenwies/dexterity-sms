"use client"

import Link from "next/link"

import { Avatar, AvatarFallback } from "@repo/ui/components/avatar"
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

import { routes } from "@repo/routes"
import { OrganizationModel } from "@repo/types/organization"

type SidebarHeaderProps = {
	allOrganizations: OrganizationModel[]
	organization: OrganizationModel
}
const SidebarHeader = ({ allOrganizations, organization: currentOrganization }: SidebarHeaderProps) => {
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
								<Avatar className="border-none">
									<AvatarFallback className="bg-primary text-primary-foreground">
										{currentOrganization.name[0]}
									</AvatarFallback>
								</Avatar>
								<span className="truncate font-medium">{currentOrganization.name}</span>
								<Icon
									className="ml-auto"
									name={IconName.CHEVRONS_UP_DOWN}
								/>
							</SidebarPrimitive.SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-2xs"
							align="start"
							side={isMobile ? "bottom" : "right"}
						>
							<DropdownMenuLabel>Organizations</DropdownMenuLabel>
							{allOrganizations.map((organization) => {
								return (
									<DropdownMenuItem
										asChild
										key={organization.id}
									>
										<Link href={routes.web.ORGANIZATION(organization.id)}>
											<Avatar className="size-6 rounded-sm border-none">
												<AvatarFallback className="bg-primary text-primary-foreground">
													{organization.name[0]}
												</AvatarFallback>
											</Avatar>
											{organization.name}
											{organization.id === currentOrganization.id && (
												<Icon
													className="ml-auto"
													name={IconName.CHECK}
												/>
											)}
										</Link>
									</DropdownMenuItem>
								)
							})}
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href={routes.web.ALL_ORGANIZATIONS}>
									<Icon name={IconName.ARROW_RETURN}></Icon>
									All organizations
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarPrimitive.SidebarMenuItem>
			</SidebarPrimitive.SidebarMenu>
		</SidebarPrimitive.SidebarHeader>
	)
}

export { SidebarHeader }
