import { Skeleton } from "@repo/ui/components/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/table"

import { getCampaignTableColumns } from "~/features/campaign/components/campaign-table/columns"

const CampaignTableSkeleton = () => {
	const columns = getCampaignTableColumns()

	return (
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
	)
}

export { CampaignTableSkeleton }
