import Papa from "papaparse"

class CsvParser {
	private _data: { [key: string]: string }[] | undefined = undefined
	private _headers: string[] | undefined = undefined

	get headers(): string[] {
		if (this._headers === undefined) throw new Error("Must parse before accessing CSV fields")

		return this._headers
	}

	get data(): { [key: string]: string }[] {
		if (this._data === undefined) throw new Error("Must parse before accessing CSV data")

		return this._data
	}

	async parseFromFile(csv: File): Promise<void> {
		if (csv.type !== "text/csv") throw new Error("File must be of type text/csv")

		const text = await csv.text()

		const data = Papa.parse<{ [key: string]: string }>(text, {
			header: true,
			skipEmptyLines: true
		})
		if (data.errors.length > 0) throw new Error("Error parsing CSV")
		else if (!data.meta.fields || !data.meta.fields.length) throw new Error("CSV has no headers")

		this._headers = data.meta.fields.reduce<string[]>((acc, field) => {
			if (!!field.trim()) acc.push(field.trim())
			return acc
		}, [])

		this._data = data.data
	}

	async parseFromString(csv: string): Promise<void> {
		const data = Papa.parse<{ [key: string]: string }>(csv, {
			header: true,
			skipEmptyLines: true
		})
		if (data.errors.length > 0) throw new Error("Error parsing CSV")
		else if (!data.meta.fields || !data.meta.fields.length) throw new Error("CSV has no headers")

		this._headers = data.meta.fields.reduce<string[]>((acc, field) => {
			if (!!field.trim()) acc.push(field.trim())
			return acc
		}, [])

		this._data = data.data
	}
}

export { CsvParser }
