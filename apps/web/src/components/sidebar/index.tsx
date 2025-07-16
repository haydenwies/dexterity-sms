import * as SidebarPrimitive from "@repo/ui/components/sidebar"

import { SidebarContent } from "~/components/sidebar/content"
import { SidebarFooter } from "~/components/sidebar/footer"
import { SidebarHeader } from "~/components/sidebar/header"

const SidebarProvider = SidebarPrimitive.SidebarProvider

const Sidebar = () => {
	return (
		<SidebarPrimitive.Sidebar>
			<SidebarHeader />
			<SidebarContent />
			<SidebarFooter />
		</SidebarPrimitive.Sidebar>
	)
}

export { Sidebar, SidebarProvider }
