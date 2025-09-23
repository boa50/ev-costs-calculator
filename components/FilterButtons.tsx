import { View, Pressable, Text } from 'react-native'

export type FilterButtonsObject = {
    [index: string]: { label: string; isActive: boolean }
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
                    key={key}
                    label={values.label}
                    isActive={values.isActive}
                    setActive={() => handleToggleActive(key)}
                />
            ))}
        </View>
    )
}

type ButtonProps = {
    label: string
    isActive: boolean
    setActive: () => void
}

function Button({ label, isActive, setActive }: ButtonProps) {
    return (
        <View>
            <Pressable
                className={`px-2 rounded-lg flex items-center w-full border 
                    border-gray-500 bg-gray-700/5 
                    disabled:bg-sky-700 disabled:border-sky-700`}
                disabled={isActive}
                onPress={setActive}
            >
                <Text
                    disabled={isActive}
                    className={`font-normal text-sm text-gray-500 disabled:text-white`}
                >
                    {label}
                </Text>
            </Pressable>
        </View>
    )
}
