import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { CsvParser } from "@repo/csv"
import { type UploadContactCsvDto, uploadContactCsvDtoSchema } from "@repo/types/contact"
import { toast } from "@repo/ui/components/sonner"

import { uploadContactCsv } from "~/actions/contact/upload-contact-csv"

const useUploadContactCsv = () => {
	const [loading, setLoading] = useState<boolean>(false)

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

			if (!params.organizationId || Array.isArray(params.organizationId)) {
				toast.error("Organization ID is required")
				return
			}

			const res = await uploadContactCsv(params.organizationId, csv, data)
			if (!res.success) {
				toast.error(res.error)
				onError?.()
				return
			}

			onSuccess?.()

			setLoading(false)
		})()
	}

	return {
		loading,
		form,
		csvHeaders,
		handleCsvChange,
		handleReset,
		handleUploadCsv
	}
}

export { useUploadContactCsv }
