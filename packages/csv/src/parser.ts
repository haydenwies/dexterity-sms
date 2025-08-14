import Papa from "papaparse"

class CsvParser {
	private readonly csv: File
	private _data: { [key: string]: string }[] | undefined = undefined
	private _headers: string[] | undefined = undefined

	constructor(csv: File) {
		if (csv.type !== "text/csv") throw new Error("File must be of type text/csv")

		this.csv = csv
	}

	async parse(): Promise<void> {
		const text = await this.csv.text()

		const data = Papa.parse<{ [key: string]: string }>(text, {
			header: true,
			skipEmptyLines: true
		})
		if (data.errors.length > 0) throw new Error("Error parsing CSV")
		else if (!data.meta.fields || !data.meta.fields.length) throw new Error("CSV has no headers")

		this._headers = data.meta.fields
		this._data = data.data
	}

	get headers(): string[] {
		if (this._headers === undefined) throw new Error("Must run parse() before accessing CSV fields")

		return this._headers
	}

	get data(): { [key: string]: string }[] {
		if (this._data === undefined) throw new Error("Must run parse() before accessing CSV data")

		return this._data
	}
}

export { CsvParser }
