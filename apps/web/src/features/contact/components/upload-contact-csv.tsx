"use client"

import { useId, useState } from "react"

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
import { Spinner } from "@repo/ui/components/spinner"

import { useUploadContactCsv } from "~/features/contact/hooks/use-contact-csv"

type UploadContactCsvDialogProps = {
	open: boolean
	setOpen: (open: boolean) => void
}
const UploadContactCsvDialog = ({ open, setOpen }: UploadContactCsvDialogProps) => {
	const FORM_ID = useId()

	const { loading, form, csvHeaders, handleCsvChange, handleReset, handleUploadCsv } = useUploadContactCsv()

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
					<DialogTitle>Upload CSV</DialogTitle>
					<DialogDescription>
						Provide a CSV file and select the corresponding columns to upload new contacts.
					</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-4"
					id={FORM_ID}
					onSubmit={(e) => {
						e.preventDefault()
						handleUploadCsv({ onSuccess: () => setOpen(false) })
					}}
				>
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
						form={FORM_ID}
						type="submit"
					>
						{loading && <Spinner />}
						Upload
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const UploadContactCsvButton = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				<Icon name={IconName.FILE_UPLOAD} />
				Upload CSV
			</Button>
			<UploadContactCsvDialog
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}

export { UploadContactCsvButton }
