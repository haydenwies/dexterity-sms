import * as SidebarPrimitive from "@dexterity-sms/ui/components/sidebar"

type SidebarProps = Readonly<{
	children: React.ReactNode
}>

const Sidebar = ({ children }: SidebarProps) => {
	return <SidebarPrimitive.Sidebar collapsible="icon">{children}</SidebarPrimitive.Sidebar>
}

export { Sidebar }
