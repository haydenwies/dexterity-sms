"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ForgotPasswordDto, forgotPasswordDtoSchema } from "@repo/types/auth"
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { toast } from "@repo/ui/components/sonner"
import { Spinner } from "@repo/ui/components/spinner"
import { cn } from "@repo/ui/lib/utils"

import { forgotPassword } from "~/actions/auth/forgot-password"
import { PLACEHOLDERS } from "~/lib/placeholders"

type ForgotPasswordFormProps = Readonly<{
	className?: string
}>

const ForgotPasswordForm = ({ className }: ForgotPasswordFormProps) => {
	const form = useForm<ForgotPasswordDto>({
		resolver: zodResolver(forgotPasswordDtoSchema),
		defaultValues: {
			email: ""
		}
	})
	const { isSubmitting, isSubmitSuccessful } = form.formState

	const handleSubmit = form.handleSubmit(async (data: ForgotPasswordDto) => {
		const res = await forgotPassword(data)
		if (!res.success) toast.error(res.error)
	})

	if (isSubmitSuccessful)
		return (
			<Alert>
				<Icon name={IconName.CHECK_CIRCLE} />
				<AlertTitle>Email sent</AlertTitle>
				<AlertDescription>Check your inbox for a link to reset your password</AlertDescription>
			</Alert>
		)

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={async (e) => {
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
				<Button disabled={isSubmitting}>
					{isSubmitting && <Spinner />}
					Send reset email
				</Button>
			</Form>
		</form>
	)
}

export { ForgotPasswordForm }
