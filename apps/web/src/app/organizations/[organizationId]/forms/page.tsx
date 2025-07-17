import { Button } from "@repo/ui/components/button"
import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"
import { Suspense } from "react"

import { getAllForms } from "~/data/form/get-all-forms"
import { AllFormsTable } from "~/features/form/all-forms-table/components/table"
import { AllFormsTableSkeleton } from "~/features/form/all-forms-table/components/table-skeleton"

const AllFormsPage = () => {
	const allFormsPromise = getAllForms()

	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow>
					<h1>All Forms</h1>
					<Button>Create Form</Button>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<Suspense fallback={<AllFormsTableSkeleton />}>
					<AllFormsTable allFormsPromise={allFormsPromise} />
				</Suspense>
			</PageContent>
		</Page>
	)
}

export default AllFormsPage
