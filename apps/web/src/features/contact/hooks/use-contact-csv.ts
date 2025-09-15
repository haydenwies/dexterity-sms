import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { CsvParser } from "@repo/csv"
import { type UploadContactCsvDto, uploadContactCsvDtoSchema } from "@repo/types/contact"

import { uploadContactCsv } from "~/actions/contact/upload-contact-csv"

const useUploadContactCsv = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const [csv, setCsv] = useState<File | null>(null)
	const [csvHeaders, setCsvHeaders] = useState<string[]>([])

	const params = useParams()

	// TODO: Add file field to form
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

		const parser = new CsvParser()
		await parser.parseFromFile(file)

		setCsvHeaders(parser.headers)
	}

	const handleReset = () => {
		form.reset()
	}

	type HandleUploadCsvConfig = {
		onError?: () => void
		onSuccess?: () => void
	}
	const handleUploadCsv = async ({ onError, onSuccess }: HandleUploadCsvConfig = {}) => {
		form.handleSubmit(async (data) => {
			if (!csv) return
			setLoading(true)

			const organizationId = params.organizationId
			if (!organizationId || Array.isArray(organizationId)) {
				setError("Organization ID is required")
				onError?.()
				return
			}

			try {
				await uploadContactCsv(organizationId, csv, data)
				onSuccess?.()
			} catch {
				setError("An unknown error occurred")
				onError?.()
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
		handleUploadCsv
	}
}

export { useUploadContactCsv }
