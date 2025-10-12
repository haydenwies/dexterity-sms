import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from "~/components/sidebar"
import { getUser } from "~/data/auth/get-user"
import { getManyConversationsUnreadCount } from "~/data/conversation/get-total-unread-count"
import { getManyOrganizations } from "~/data/organization/get-many-organizations"
import { getOrganization } from "~/data/organization/get-organization"

type OrganizationLayoutProps = {
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}
const OrganizationLayout = async ({ children, params }: OrganizationLayoutProps) => {
	const { organizationId } = await params

	const allOrganizationsPromise = getManyOrganizations()
	const organizationPromise = getOrganization(organizationId)
	const userPromise = getUser()
	const conversationUnreadCountPromise = getManyConversationsUnreadCount(organizationId)

	return (
		<SidebarProvider>
			<Sidebar>
				<SidebarHeader
					allOrganizationsPromise={allOrganizationsPromise}
					organizationPromise={organizationPromise}
				/>
				<SidebarContent
					organizationPromise={organizationPromise}
					conversationUnreadCountPromise={conversationUnreadCountPromise}
				/>
				<SidebarFooter
					organizationPromise={organizationPromise}
					userPromise={userPromise}
				/>
			</Sidebar>
			{children}
		</SidebarProvider>
	)
}

export default OrganizationLayout
