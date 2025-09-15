"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useEffect, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"

import { type CampaignModel, type UpdateCampaignDto, updateCampaignDtoSchema } from "@repo/types/campaign"

import { updateCampaign } from "~/actions/campaign/update-campaign"
import { useDebounce } from "~/hooks/use-debounce"

enum SaveState {
	SAVING = "saving",
	SAVED = "saved",
	ERROR = "error"
}

type UpdateCampaignContextType = {
	form: UseFormReturn<UpdateCampaignDto>
	saveState: SaveState
}
const UpdateCampaignContext = createContext<UpdateCampaignContextType | null>(null)

type UpdateCampaignProviderProps = {
	organizationId: string
	campaign: CampaignModel
	children: React.ReactNode
}
const UpdateCampaignProvider = ({ organizationId, campaign, children }: UpdateCampaignProviderProps) => {
	const [saveState, setSaveState] = useState<SaveState>(SaveState.SAVED)
	const { debouncedFn, cleanup } = useDebounce({ delay: 1000 })

	const form = useForm<UpdateCampaignDto>({
		resolver: zodResolver(updateCampaignDtoSchema),
		defaultValues: {
			name: campaign.name,
			body: campaign.body
		}
	})

	const handleUpdateCampaign = debouncedFn(
		form.handleSubmit(async (data: UpdateCampaignDto) => {
			setSaveState(SaveState.SAVING)

			try {
				await updateCampaign(organizationId, campaign.id, data)
				setSaveState(SaveState.SAVED)
			} catch {
				setSaveState(SaveState.ERROR)
			}
		})
	)

	useEffect(() => {
		const subscription = form.watch(() => {
			handleUpdateCampaign()
		})

		return () => {
			cleanup()
			subscription.unsubscribe()
		}
	}, [form, handleUpdateCampaign, cleanup])

	return <UpdateCampaignContext.Provider value={{ form, saveState }}>{children}</UpdateCampaignContext.Provider>
}

export { SaveState, UpdateCampaignContext, UpdateCampaignProvider }
