import { SidebarProvider, Sidebar } from "~/components/sidebar"

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<Sidebar />
			{children}
		</SidebarProvider>
	)
}

export default OrganizationLayout
