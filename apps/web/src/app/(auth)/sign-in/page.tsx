import { SignInForm } from "~/features/auth/sign-in"

const SignInPage = () => {
	return (
		<div className="flex items-center justify-center p-6">
			<div className="flex w-full max-w-xs flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1>Sign in to your account</h1>
					<p className="text-muted-foreground text-balance text-sm">
						Enter your email below to sign in to your account
					</p>
				</div>
				<SignInForm />
			</div>
		</div>
	)
}

export default SignInPage
