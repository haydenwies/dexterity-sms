"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { type SignUpDto, signUpDtoSchema } from "@dexterity-sms/core/auth"
import { routes } from "@dexterity-sms/routes"
import { Button } from "@dexterity-sms/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dexterity-sms/ui/components/form"
import { Input } from "@dexterity-sms/ui/components/input"
import { Spinner } from "@dexterity-sms/ui/components/spinner"
import { cn } from "@dexterity-sms/ui/lib/utils"

import { toast } from "@dexterity-sms/ui/components/sonner"
import { signUp } from "~/actions/auth/sign-up"
import { PLACEHOLDERS } from "~/lib/placeholders"

type SignUpFormProps = Readonly<{
	className?: string
}>

const SignUpForm = ({ className }: SignUpFormProps) => {
	const form = useForm<SignUpDto>({
		resolver: zodResolver(signUpDtoSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	})
	const { isSubmitting } = form.formState

	const handleSubmit = form.handleSubmit(async (data: SignUpDto) => {
		const res = await signUp(data)
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
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First name</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										placeholder={PLACEHOLDERS.firstName}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last name</FormLabel>
								<FormControl>
									<Input
										disabled={isSubmitting}
										placeholder={PLACEHOLDERS.lastName}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
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
							<FormLabel>Password</FormLabel>
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
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
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
				Sign up
			</Button>
			<p className="text-muted-foreground text-center">
				Already have an account?{" "}
				<Link
					className="underline"
					href={routes.web.SIGN_IN}
				>
					Sign in
				</Link>
			</p>
		</form>
	)
}

export { SignUpForm }
