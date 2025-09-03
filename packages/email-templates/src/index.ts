import { toPlainText } from "@react-email/render"

import { type ForgotPasswordParams } from "../emails/forgot-password"
import { getTemplateHtml } from "./get-template"

type EmailTemplateReturn = {
	html: string
	text: string
}

const forgotPassword = async (params: ForgotPasswordParams): Promise<EmailTemplateReturn> => {
	const html = await getTemplateHtml({ name: "forgot-password", params: {} })
	const text = toPlainText(html)

	return { html, text }
}

export { forgotPassword }
