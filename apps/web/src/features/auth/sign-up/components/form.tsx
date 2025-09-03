"use client"

import Link from "next/link"

import { Alert, AlertTitle } from "@repo/ui/components/alert"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { useSignUp } from "~/features/auth/sign-up/hooks/use-sign-up"
import { placeholders } from "~/lib/placeholders"
import { routes } from "~/lib/routes"

const SignUpForm = ({ className }: { className?: string }) => {
	const { error, signUpForm, handleSignUp } = useSignUp()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSignUp()
			}}
		>
			{error && (
				<Alert variant="destructive">
					<Icon name={IconName.ALERT_CIRCLE} />
					<AlertTitle>{error}</AlertTitle>
				</Alert>
			)}
			<Form {...signUpForm}>
				<FormField
					control={signUpForm.control}
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
					control={signUpForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
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
				<FormField
					control={signUpForm.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
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
			<Button>Sign up</Button>
			<p className="text-muted-foreground text-center">
				Already have an account?{" "}
				<Link
					className="underline"
					href={routes.SIGN_IN}
				>
					Sign in
				</Link>
			</p>
		</form>
	)
}

export { SignUpForm }
