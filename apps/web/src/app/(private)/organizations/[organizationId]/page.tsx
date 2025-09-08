import { redirect } from "next/navigation"

import { routes } from "~/lib/routes"

type OrganizationPageProps = {
	params: Promise<{ organizationId: string }>
}

const OrganizationPage = async ({ params }: OrganizationPageProps) => {
	const { organizationId } = await params

	return redirect(routes.HOME(organizationId))
}

export default OrganizationPage
