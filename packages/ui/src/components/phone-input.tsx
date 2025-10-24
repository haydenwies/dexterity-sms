"use client"

// TODO Remove dependency on react-phone-number-input

import { CheckIcon, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

import { Button } from "@dexterity-sms/ui/components/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandInputIcon,
	CommandInputWrapper,
	CommandItem,
	CommandList
} from "@dexterity-sms/ui/components/command"
import { Input } from "@dexterity-sms/ui/components/input"
import { Popover, PopoverContent, PopoverTrigger } from "@dexterity-sms/ui/components/popover"
import { ScrollArea } from "@dexterity-sms/ui/components/scroll-area"
import { cn } from "@dexterity-sms/ui/lib/utils"

// #region PhoneInput

type PhoneInputProps = Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref"> &
	Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
		onChange?: (value: RPNInput.Value) => void
	}
const PhoneInput = ({ className, defaultCountry, onChange, value, ...props }: PhoneInputProps) => {
	return (
		<RPNInput.default
			className={cn("flex", className)}
			flagComponent={FlagComponent}
			countrySelectComponent={CountrySelect}
			inputComponent={InputComponent}
			smartCaret={false}
			value={value || undefined}
			defaultCountry={defaultCountry || "CA"}
			/**
			 * Handles the onChange event.
			 *
			 * react-phone-number-input might trigger the onChange event as undefined
			 * when a valid phone number is not entered. To prevent this,
			 * the value is coerced to an empty string.
			 *
			 * @param {E164Number | undefined} value - The entered value
			 */
			onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
			{...props}
		/>
	)
}

// #region InputComponent

type InputComponentProps = React.ComponentProps<"input">
const InputComponent = ({ className, ...props }: InputComponentProps) => {
	return (
		<Input
			className={cn("rounded-e-lg rounded-s-none", className)}
			{...props}
		/>
	)
}

// #region CountrySelect

type CountrySelectProps = {
	disabled?: boolean
	value: RPNInput.Country
	options: { label: string; value: RPNInput.Country | undefined }[]
	onChange: (country: RPNInput.Country) => void
}
const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
	const scrollAreaRef = React.useRef<HTMLDivElement>(null)
	const [searchValue, setSearchValue] = React.useState<string>("")
	const [isOpen, setIsOpen] = React.useState<boolean>(false)

	return (
		<Popover
			open={isOpen}
			modal
			onOpenChange={(open) => {
				setIsOpen(open)
				if (open) setSearchValue("")
			}}
		>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
					disabled={disabled}
				>
					<FlagComponent
						country={selectedCountry}
						countryName={selectedCountry}
					/>
					<ChevronsUpDown className={cn("-mr-2 size-4 opacity-50", disabled ? "hidden" : "opacity-100")} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInputWrapper>
						<CommandInputIcon />
						<CommandInput
							value={searchValue}
							onValueChange={(value) => {
								setSearchValue(value)
								setTimeout(() => {
									if (scrollAreaRef.current) {
										const viewportElement = scrollAreaRef.current.querySelector(
											"[data-radix-scroll-area-viewport]"
										)
										if (viewportElement) viewportElement.scrollTop = 0
									}
								}, 0)
							}}
							placeholder="Search country..."
						/>
					</CommandInputWrapper>
					<CommandList>
						<ScrollArea
							ref={scrollAreaRef}
							className="h-72"
						>
							<CommandEmpty>No country found.</CommandEmpty>
							<CommandGroup>
								{countryList.map(({ value, label }) =>
									value ? (
										<CountrySelectOption
											key={value}
											country={value}
											countryName={label}
											selectedCountry={selectedCountry}
											onChange={onChange}
											onSelectComplete={() => setIsOpen(false)}
										/>
									) : null
								)}
							</CommandGroup>
						</ScrollArea>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

// #region CountrySelectOption

type CountrySelectOptionProps = RPNInput.FlagProps & {
	selectedCountry: RPNInput.Country
	onChange: (country: RPNInput.Country) => void
	onSelectComplete: () => void
}
const CountrySelectOption = ({
	country,
	countryName,
	selectedCountry,
	onChange,
	onSelectComplete
}: CountrySelectOptionProps) => {
	const handleSelect = () => {
		onChange(country)
		onSelectComplete()
	}

	return (
		<CommandItem
			className="gap-2"
			onSelect={handleSelect}
		>
			<FlagComponent
				country={country}
				countryName={countryName}
			/>
			<span className="flex-1 text-sm">{countryName}</span>
			<span className="text-foreground/50 text-sm">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
			<CheckIcon className={`ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`} />
		</CommandItem>
	)
}

// #region FlagComponent

type FlagComponentProps = RPNInput.FlagProps
const FlagComponent = ({ country, countryName }: FlagComponentProps) => {
	const Flag = flags[country]

	return (
		<span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
			{Flag && <Flag title={countryName} />}
		</span>
	)
}

export { PhoneInput }
