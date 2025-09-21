import { Sidebar, SidebarProvider } from "~/components/sidebar"
import { getManyOrganizations } from "~/data/organization/get-many-organizations"
import { getOrganization } from "~/data/organization/get-organization"

type OrganizationLayoutProps = {
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}
const OrganizationLayout = async ({ children, params }: OrganizationLayoutProps) => {
	const { organizationId } = await params
	const [allOrganizations, organization] = await Promise.all([
		getManyOrganizations(),
		getOrganization(organizationId)
	])

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
