import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { getAllTags } from "~/actions/contact/get-all-tags"
import { AllContactsTable } from "~/features/contact/all-contacts-table"
import { CreateContactButton } from "~/features/contact/create-contact"

const AllContactsPage = async () => {
	const contactsPromise = getAllContacts()
	const contactTagsPromise = getAllTags()

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon
							className="size-6"
							name={IconName.USERS}
						/>
						<h1>Contacts</h1>
					</PageHeaderGroup>
					<CreateContactButton />
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<AllContactsTable
					contactsPromise={contactsPromise}
					contactTagsPromise={contactTagsPromise}
				/>
			</PageContent>
		</Page>
	)
}

export default AllContactsPage
