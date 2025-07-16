import { Button } from "@repo/ui/components/button"
import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"

const AllFormsPage = () => {
	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow>
					<h1>All Forms</h1>
					<Button>Create Form</Button>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>content</PageContent>
		</Page>
	)
}

export default AllFormsPage
