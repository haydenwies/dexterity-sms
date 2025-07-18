import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent } from "@repo/ui/components/page"

const EditFormPageLoading = () => {
	return (
		<Page>
			<PageContent className="flex flex-col items-center justify-center">
				<div className="flex items-center gap-2">
					<Icon
						className="animate-spin"
						name={IconName.SPINNER}
					/>
					<p>Loading...</p>
				</div>
			</PageContent>
		</Page>
	)
}

export default EditFormPageLoading
