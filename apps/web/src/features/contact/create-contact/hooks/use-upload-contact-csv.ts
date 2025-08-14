import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { CsvParser } from "@repo/csv"
import { type UploadContactCsvDto, uploadContactCsvDtoSchema } from "@repo/types/contact/dto/upload-contact-csv"

import { uploadContactCsv } from "~/actions/contact/upload-contact-csv"

type HandleSubmitConfig = {
	onSuccess?: () => void
	resetOnSuccess?: boolean
}

const useUploadContactCsv = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const [csv, setCsv] = useState<File | null>(null)
	const [csvHeaders, setCsvHeaders] = useState<string[]>([])

	const form = useForm<UploadContactCsvDto>({
		resolver: zodResolver(uploadContactCsvDtoSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: ""
		}
	})

	const handleCsvChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setCsv(file)

		const parser = new CsvParser(file)
		await parser.parse()
		setCsvHeaders(parser.headers)
	}

	const handleReset = () => {
		form.reset()
	}

	const handleSubmit = async ({ onSuccess, resetOnSuccess = true }: HandleSubmitConfig = {}) => {
		form.handleSubmit(async (data) => {
			if (!csv) return
			setLoading(true)

			try {
				const res = await uploadContactCsv(csv, data)
				if (!res.success) {
					setError(res.message)
					return
				}

				if (resetOnSuccess) handleReset()
				onSuccess?.()
			} catch {
				setError("An unknown error occurred")
			} finally {
				setLoading(false)
			}
		})()
	}

	return {
		loading,
		error,
		form,
		csvHeaders,
		handleCsvChange,
		handleReset,
		handleSubmit
	}
}

export { useUploadContactCsv }
