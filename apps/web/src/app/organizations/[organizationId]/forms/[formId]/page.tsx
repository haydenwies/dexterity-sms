import { Button } from "@repo/ui/components/button"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

const FormPage = () => {
	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow>
					<PageHeaderGroup type="column">
						<h1>Form</h1>
						<p className="text-muted-foreground">form description</p>
					</PageHeaderGroup>
					<Button>Edit form</Button>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>content</PageContent>
		</Page>
	)
}

export default FormPage
