import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { getAllConversations } from "~/actions/message/get-all-conversations"
import { AllConversationsList } from "~/features/message/all-conversations/components/list"
import { NewMessageButton } from "~/features/message/new-message"

type Props = {
	children: React.ReactNode
	params: Promise<{ organizationId: string }>
}

const AllMessagesLayout = async ({ children }: Props) => {
	const conversationsPromise = getAllConversations()
	const contactsPromise = getAllContacts()

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<PageHeaderGroup>
						<h1>Messages</h1>
					</PageHeaderGroup>
					<PageHeaderGroup>
						<NewMessageButton />
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent
				className="grid grid-cols-[auto_1fr]"
				disableScroll
			>
				<AllConversationsList
					conversationsPromise={conversationsPromise}
					contactsPromise={contactsPromise}
				/>
				{children}
			</PageContent>
		</Page>
	)
}

export default AllMessagesLayout
