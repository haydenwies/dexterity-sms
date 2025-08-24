"use client"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

/**
 * This will display a button to open the new message dialog
 */
const NewMessageButton = () => {
	return (
		<Button>
			<Icon name={IconName.PLUS} />
			New
		</Button>
	)
}

export { NewMessageButton }
