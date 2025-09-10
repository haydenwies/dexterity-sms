import { getAllOrganizations } from "~/actions/organization/get-all-organizations"
import { getOrganization } from "~/actions/organization/get-organization"
import { Sidebar, SidebarProvider } from "~/components/sidebar"

type OrganizationLayoutProps = {
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}
const OrganizationLayout = async ({ children, params }: OrganizationLayoutProps) => {
	const { organizationId } = await params
	const [allOrganizations, organization] = await Promise.all([getAllOrganizations(), getOrganization(organizationId)])

	return (
		<SidebarProvider>
			<Sidebar
				allOrganizations={allOrganizations}
				organization={organization}
			/>
			{children}
		</SidebarProvider>
	)
}

export default OrganizationLayout
