import { Button, Html } from "@react-email/components"

type ForgotPasswordProps = {
	url: string
}

const ForgotPassword = ({ url }: ForgotPasswordProps) => {
	return (
		<Html>
			<Button
				href="https://example.com"
				style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
			>
				Click me
			</Button>
		</Html>
	)
}

export type { ForgotPasswordProps }
export default ForgotPassword
