import { Input } from "@repo/ui/components/input"
import { Skeleton } from "@repo/ui/components/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/table"

import { getContactTableColumns } from "~/features/contact/components/contact-table/columns"

const ContactTableSkeleton = () => {
	const columns = getContactTableColumns()

	return (
		<div className="space-y-4">
			<Input
				className="w-full max-w-sm"
				placeholder="Search..."
				readOnly
			/>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column, index) => (
								<TableHead key={column.id || index}>
									<Skeleton className="h-9 w-full" />
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 5 }).map((_, rowIndex) => (
							<TableRow key={rowIndex}>
								{columns.map((column, colIndex) => (
									<TableCell key={column.id || colIndex}>
										<Skeleton className={`h-9 w-full`} />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

export { ContactTableSkeleton }
