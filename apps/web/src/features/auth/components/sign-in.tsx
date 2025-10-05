"use client"

import Link from "next/link"

import { routes } from "@repo/routes"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Spinner } from "@repo/ui/components/spinner"
import { cn } from "@repo/ui/lib/utils"

import { useSignIn } from "~/features/auth/hooks/use-sign-in"
import { placeholders } from "~/lib/placeholders"

const SignInForm = ({ className }: { className?: string }) => {
	const { loading, signInForm, handleSignIn } = useSignIn()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSignIn()
			}}
		>
			<Form {...signInForm}>
				<FormField
					control={signInForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									disabled={loading}
									type="email"
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
									disabled={loading}
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
			<Button disabled={loading}>
				{loading && <Spinner />}
				Sign in
			</Button>
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
