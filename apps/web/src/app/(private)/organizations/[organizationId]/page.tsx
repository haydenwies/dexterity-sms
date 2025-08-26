import { redirect } from "next/navigation"

import { routes } from "~/lib/routes"

type Props = {
	params: Promise<{ organizationId: string }>
}

const OrganizationPage = async ({ params }: Props) => {
	const { organizationId } = await params

	return redirect(routes.HOME(organizationId))
}

export default OrganizationPage
