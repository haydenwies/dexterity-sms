import { ResetPasswordForm } from "~/features/auth/components/reset-password"

type Props = {
	searchParams: Promise<{ token: string }>
}

const ResetPasswordPage = async ({ searchParams }: Props) => {
	const { token } = await searchParams

	return (
		<div className="flex items-center justify-center p-6">
			<div className="flex w-full max-w-xs flex-col gap-6">
				<div className="text-center">
					<h1>Reset your password</h1>
					<p className="text-muted-foreground text-balance">Enter your new password below</p>
				</div>
				<ResetPasswordForm token={token} />
			</div>
		</div>
	)
}

export default ResetPasswordPage
