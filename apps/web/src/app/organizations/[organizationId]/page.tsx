import { redirect } from "next/navigation"

import { routes } from "@dexterity-sms/routes"

type PageProps = Readonly<{
	params: Promise<{ organizationId: string }>
}>

const OrganizationPage = async ({ params }: PageProps) => {
	const { organizationId } = await params

	return redirect(routes.web.HOME(organizationId))
}

export default OrganizationPage
