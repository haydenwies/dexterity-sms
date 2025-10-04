import { Sidebar, SidebarProvider } from "~/components/sidebar"
import { getUser } from "~/data/auth/get-user"
import { getManyOrganizations } from "~/data/organization/get-many-organizations"
import { getOrganization } from "~/data/organization/get-organization"

type OrganizationLayoutProps = {
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}
const OrganizationLayout = async ({ children, params }: OrganizationLayoutProps) => {
	const { organizationId } = await params

	const [allOrganizations, organization, user] = await Promise.all([
		getManyOrganizations(),
		getOrganization(organizationId),
		getUser()
	])

	return (
		<SidebarProvider>
			<Sidebar
				allOrganizations={allOrganizations}
				organization={organization}
				user={user}
			/>
			{children}
		</SidebarProvider>
	)
}

export default OrganizationLayout
