"use client"

import { Button } from "@repo/ui/components/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@repo/ui/components/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select"
import { useUploadContactCsv } from "../hooks/use-upload-contact-csv"

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
}

const UploadContactCsvDialog = ({ open, setOpen }: Props) => {
	const { loading, form, csvHeaders, handleCsvChange, handleReset, handleSubmit } = useUploadContactCsv()

	return (
		<Dialog
			open={open}
			onOpenChange={(o) => {
				if (loading) return
				setOpen(o)

				if (!o) handleReset()
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Contacts</DialogTitle>
					<DialogDescription>Create contacts from a CSV file</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-4">
					<Input
						accept="text/csv"
						multiple={false}
						type="file"
						onChange={handleCsvChange}
					/>
					<Form {...form}>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Select
											disabled={csvHeaders.length === 0}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a header" />
											</SelectTrigger>
											<SelectContent>
												{csvHeaders.map((header) => (
													<SelectItem
														key={header}
														value={header}
													>
														{header}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Select
											disabled={csvHeaders.length === 0}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a header" />
											</SelectTrigger>
											<SelectContent>
												{csvHeaders.map((header) => (
													<SelectItem
														key={header}
														value={header}
													>
														{header}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Select
											disabled={csvHeaders.length === 0}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a header" />
											</SelectTrigger>
											<SelectContent>
												{csvHeaders.map((header) => (
													<SelectItem
														key={header}
														value={header}
													>
														{header}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Select
											disabled={csvHeaders.length === 0}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a header" />
											</SelectTrigger>
											<SelectContent>
												{csvHeaders.map((header) => (
													<SelectItem
														key={header}
														value={header}
													>
														{header}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Form>
				</form>
				<DialogFooter>
					<Button
						disabled={loading || csvHeaders.length === 0}
						onClick={handleReset}
						variant="outline"
					>
						<Icon name={IconName.RESET} />
						Reset
					</Button>
					<Button
						disabled={loading || csvHeaders.length === 0}
						onClick={() => handleSubmit({ onSuccess: () => setOpen(false) })}
					>
						<Icon name={IconName.PLUS} />
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export { UploadContactCsvDialog }
