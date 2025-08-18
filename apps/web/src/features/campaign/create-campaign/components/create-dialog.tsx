import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/dialog"

const CreateCampaignDialog = () => {
	return (
		<Dialog>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Campaign</DialogTitle>
					<DialogDescription>Create a new campaign to send to your contacts.</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export { CreateCampaignDialog }
