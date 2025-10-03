import { SesProvider } from "./providers/ses"

async function testEmail() {
	const emailProvider = new SesProvider({
		sourceEmail: "haydenwies@gmail.com",
		region: "us-east-1",
		accessKeyId: "",
		secretAccessKey: ""
	})

	try {
		await emailProvider.send({
			to: "haydenwies@gmail.com",
			subject: "Test Email from SES",
			html: "<h1>Hello!</h1><p>This is a test email from AWS SES.</p>",
			plainText: "Hello! This is a test email from AWS SES."
		})

		console.log("✅ Email sent successfully!")
	} catch (error) {
		console.error("❌ Error sending email:", error)
	}
}

testEmail()
