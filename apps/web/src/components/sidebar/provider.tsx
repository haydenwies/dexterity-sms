import * as SidebarPrimitive from "@dexterity-sms/ui/components/sidebar"

type SidebarProviderProps = Readonly<{
	children: React.ReactNode
}>

const SidebarProvider = ({ children }: SidebarProviderProps) => {
	return <SidebarPrimitive.SidebarProvider>{children}</SidebarPrimitive.SidebarProvider>
}

export { SidebarProvider }
