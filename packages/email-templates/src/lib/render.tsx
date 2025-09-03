import { render, toPlainText } from "@react-email/render"
import { ComponentType } from "react"

const renderHtml = async <T extends Record<string, any>>(Comp: ComponentType<T>, props: T): Promise<string> => {
	return render(<Comp {...props} />)
}

const convertHtmlToText = (html: string): string => {
	return toPlainText(html)
}

export { convertHtmlToText, renderHtml }
