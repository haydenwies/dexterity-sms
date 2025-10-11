"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { type ResetPasswordDto, resetPasswordDtoSchema } from "@repo/types/auth"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { toast } from "@repo/ui/components/sonner"
import { Spinner } from "@repo/ui/components/spinner"
import { cn } from "@repo/ui/lib/utils"

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
