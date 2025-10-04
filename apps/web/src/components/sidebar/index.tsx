import { type UserDto } from "@repo/types/auth"
import { type OrganizationModel } from "@repo/types/organization"
import * as SidebarPrimitive from "@repo/ui/components/sidebar"

import { SidebarContent } from "~/components/sidebar/content"
import { SidebarFooter } from "~/components/sidebar/footer"
import { SidebarHeader } from "~/components/sidebar/header"

const SidebarProvider = SidebarPrimitive.SidebarProvider

type SidebarProps = {
	allOrganizations: OrganizationModel[]
	organization: OrganizationModel
	user: UserDto
}
const Sidebar = ({ allOrganizations, organization, user }: SidebarProps) => {
	return (
		<SidebarPrimitive.Sidebar collapsible="icon">
			<SidebarHeader
				allOrganizations={allOrganizations}
				organization={organization}
			/>
			<SidebarContent organizationId={organization.id} />
			<SidebarFooter
				organizationId={organization.id}
				user={user}
			/>
		</SidebarPrimitive.Sidebar>
	)
}

export { Sidebar, SidebarProvider }
