import { render } from "@react-email/render"
import * as React from "react"

import ForgotPassword, { type ForgotPasswordParams } from "../emails/forgot-password"

type TemplateOptions = {
	name: "forgot-password"
	params: ForgotPasswordParams
}

const getTemplateHtml = async ({ name, params }: TemplateOptions): Promise<string> => {
	switch (name) {
		case "forgot-password":
			return render(<ForgotPassword {...params} />)
		default:
			throw new Error(`Template ${name} not found`)
	}
}

export { getTemplateHtml }
