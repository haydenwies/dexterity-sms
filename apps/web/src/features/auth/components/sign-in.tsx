"use client"

import Link from "next/link"

import { routes } from "@repo/routes"
import { Alert, AlertTitle } from "@repo/ui/components/alert"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { useSignIn } from "~/features/auth/hooks/use-sign-in"
import { placeholders } from "~/lib/placeholders"

const SignInForm = ({ className }: { className?: string }) => {
	const { error, signInForm, handleSignIn } = useSignIn()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSignIn()
			}}
		>
			{error && (
				<Alert variant="destructive">
					<Icon name={IconName.ALERT_CIRCLE} />
					<AlertTitle>{error}</AlertTitle>
				</Alert>
			)}
			<Form {...signInForm}>
				<FormField
					control={signInForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder={placeholders.EMAIL}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={signInForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between">
								<FormLabel>Password</FormLabel>
								<Link href={routes.web.FORGOT_PASSWORD}>
									<p>Forgot your password?</p>
								</Link>
							</div>

							<FormControl>
								<Input
									placeholder={placeholders.PASSWORD}
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
			<Button>Sign in</Button>
			<p className="text-muted-foreground text-center">
				Don&apos;t have an account?{" "}
				<Link
					className="underline"
					href={routes.web.SIGN_UP}
				>
					Sign up
				</Link>
			</p>
		</form>
	)
}

export { SignInForm }
