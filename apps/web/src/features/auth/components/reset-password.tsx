"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ResetPasswordDto, resetPasswordDtoSchema } from "@dexterity-sms/core/auth"
import { Button } from "@dexterity-sms/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dexterity-sms/ui/components/form"
import { Input } from "@dexterity-sms/ui/components/input"
import { toast } from "@dexterity-sms/ui/components/sonner"
import { Spinner } from "@dexterity-sms/ui/components/spinner"
import { cn } from "@dexterity-sms/ui/lib/utils"

import { resetPassword } from "~/actions/auth/reset-password"
import { PLACEHOLDERS } from "~/lib/placeholders"

type ResetPasswordFormProps = Readonly<{
	token: string
	className?: string
}>

const ResetPasswordForm = ({ token, className }: ResetPasswordFormProps) => {
	const form = useForm<ResetPasswordDto>({
		resolver: zodResolver(resetPasswordDtoSchema),
		defaultValues: {
			token,
			password: "",
			confirmPassword: ""
		}
	})
	const { isSubmitting } = form.formState

	const handleSubmit = form.handleSubmit(async (data: ResetPasswordDto) => {
		const res = await resetPassword(data)
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
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New password</FormLabel>
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
							<FormLabel>Confirm new password</FormLabel>
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
				Reset password
			</Button>
		</form>
	)
}

export { ResetPasswordForm }
