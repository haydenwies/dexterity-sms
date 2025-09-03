import ForgotPassword from "./emails/forgot-password"
import { convertHtmlToText, renderHtml } from "./lib/render"

type EmailTemplateReturn = {
	html: string
	text: string
}

type ForgotPasswordParams = {
	url: string
}

const forgotPassword = async (params: ForgotPasswordParams): Promise<EmailTemplateReturn> => {
	const html = await renderHtml(ForgotPassword, {
		url: params.url
	})
	const text = convertHtmlToText(html)

	return { html, text }
}

export { forgotPassword, type ForgotPasswordParams }
