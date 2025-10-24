import { redirect } from "next/navigation"

import { routes } from "@dexterity-sms/routes"

const RootPage = () => {
	return redirect(routes.web.SIGN_IN)
}

export default RootPage
