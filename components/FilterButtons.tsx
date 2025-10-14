import { View, Pressable, Text } from 'react-native'
import type { TabNames, TabValidStates } from '@/types'

export type FilterButtonsObject = {
    [index in TabNames]: {
        label: string
        isActive: boolean
        isValid: TabValidStates
    }
}

interface Props {
    state: FilterButtonsObject
    setState: React.Dispatch<React.SetStateAction<FilterButtonsObject>>
}

export function FilterButtons({ state, setState }: Props) {
    const handleToggleActive = (activeButton: keyof FilterButtonsObject) => {
        Object.entries(state).forEach(([key, values]) => {
            if (values.isActive)
                setState((prevState) => ({
                    ...prevState,
                    [key]: { ...values, isActive: false },
                }))
        })

        setState((prevState) => ({
            ...prevState,
            [activeButton]: { ...prevState[activeButton], isActive: true },
        }))
    }

    return (
        <View className="flex-row gap-2">
            {Object.entries(state).map(([key, values]) => (
                <Button
                    {...values}
                    key={key}
                    setActive={() =>
                        handleToggleActive(key as keyof FilterButtonsObject)
                    }
                />
            ))}
        </View>
    )
}

type ButtonProps = {
    label: string
    isActive: boolean
    isValid: TabValidStates
    setActive: () => void
}

function Button({ label, isActive, isValid, setActive }: ButtonProps) {
    const statusAppearance =
        isValid === 'incomplete'
            ? isActive
                ? 'bg-gray-300'
                : 'bg-gray-600'
            : isValid === 'invalid'
              ? isActive
                  ? 'bg-error-light'
                  : 'bg-error-light'
              : 'hidden'

    return (
        <View>
            <Pressable
                className={`px-2 rounded-lg flex items-center w-full border flex-row gap-1
                    border-gray-500 bg-gray-700/5 
                    disabled:bg-accent-standard disabled:border-accent-standard`}
                disabled={isActive}
                onPress={setActive}
            >
                <View
                    className={`w-2 h-2 rounded-full ${statusAppearance}`}
                ></View>
                <Text
                    disabled={isActive}
                    className={`font-normal text-sm text-text-dark-faded disabled:text-text-light`}
                >
                    {label}
                </Text>
            </Pressable>
        </View>
    )
}
