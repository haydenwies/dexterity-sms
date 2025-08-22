import { Clock8Icon } from "lucide-react"

import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

type TimeInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value"> & {
	value?: Date | undefined
	onChange?: (value: Date | undefined) => void
}
const TimeInput = ({ className, onChange, value, ...props }: TimeInputProps) => {
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return

		const timeString = event.target.value
		if (!timeString) {
			onChange(undefined)
			return
		}

		const [hours, minutes, seconds = 0] = timeString.split(":").map(Number)
		if (!hours) {
			onChange(undefined)
			return
		}

		const newDate = value ? new Date(value) : new Date()
		newDate.setHours(hours, minutes, seconds)

		onChange(newDate)
	}

	return (
		<div className="relative">
			<div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
				<Clock8Icon className="size-4" />
				<span className="sr-only">Time</span>
			</div>
			<Input
				className={cn(
					"bg-background peer appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
					className
				)}
				type="time"
				step="60"
				value={value?.toTimeString().slice(0, 5)}
				onChange={handleOnChange}
				{...props}
			/>
		</div>
	)
}

export { TimeInput }
