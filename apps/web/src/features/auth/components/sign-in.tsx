"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { routes } from "@repo/routes"
import { type SignInDto, signInDtoSchema } from "@repo/types/auth"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { toast } from "@repo/ui/components/sonner"
import { Spinner } from "@repo/ui/components/spinner"
import { cn } from "@repo/ui/lib/utils"

import { signIn } from "~/actions/auth/sign-in"
import { PLACEHOLDERS } from "~/lib/placeholders"

type SignInFormProps = Readonly<{
	className?: string
}>

const SignInForm = ({ className }: SignInFormProps) => {
	const form = useForm<SignInDto>({
		resolver: zodResolver(signInDtoSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})
	const { isSubmitting } = form.formState

	const handleSubmit = form.handleSubmit(async (data: SignInDto) => {
		const res = await signIn(data)
		if (!res.success) toast.error(res.error)
	})

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<Form {...form}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									disabled={isSubmitting}
									placeholder={PLACEHOLDERS.email}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
									disabled={isSubmitting}
									placeholder={PLACEHOLDERS.password}
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
			<Button disabled={isSubmitting}>
				{isSubmitting && <Spinner />}
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
