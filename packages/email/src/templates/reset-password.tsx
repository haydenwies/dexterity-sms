import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components"

type ResetPasswordProps = {
	url: string
}

const ResetPassword = ({ url }: ResetPasswordProps) => {
	return (
		<Html>
			<Head />
			<Preview>Reset your password</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={section}>
						<Heading style={heading}>Reset Your Password</Heading>
						<Text style={text}>
							We received a request to reset your password. Click the button below to create a new
							password.
						</Text>
						<Button
							href={url}
							target="_blank"
							rel="noreferrer noopener"
							style={button}
						>
							Reset Password
						</Button>
						<Text style={text}>This link will expire shortly for security reasons.</Text>
						<Text style={footnote}>
							If you didn't request a password reset, you can safely ignore this email. Your password will
							remain unchanged.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'
}

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px 0 48px",
	marginBottom: "64px"
}

const section = {
	padding: "0 48px"
}

const heading = {
	fontSize: "32px",
	lineHeight: "1.3",
	fontWeight: "700",
	color: "#1f2937",
	marginBottom: "24px"
}

const text = {
	fontSize: "16px",
	lineHeight: "1.5",
	color: "#374151",
	marginBottom: "24px"
}

const button = {
	backgroundColor: "#000000",
	borderRadius: "8px",
	color: "#ffffff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "12px 20px",
	marginBottom: "24px"
}

const footnote = {
	fontSize: "14px",
	lineHeight: "1.5",
	color: "#6b7280",
	marginTop: "32px",
	borderTop: "1px solid #e5e7eb",
	paddingTop: "24px"
}

export type { ResetPasswordProps }
export default ResetPassword
