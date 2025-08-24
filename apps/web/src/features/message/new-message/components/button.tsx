"use client"

import { useState } from "react"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { NewMessageDialog } from "./dialog"

/**
 * This will display a button to open the new message dialog
 */
const NewMessageButton = () => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Icon name={IconName.PLUS} />
				New
			</Button>
			<NewMessageDialog
				open={open}
				setOpen={setOpen}
			/>
		</>
	)
}

export { NewMessageButton }
