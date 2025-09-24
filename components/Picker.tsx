import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { InputLabel } from './InputLabel'
import colors from 'tailwindcss/colors'

interface Props {
    label?: string
    value: string
    setValue: (value: string) => void
    type: 'month'
    hint?: string
}

const months = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
]

export function Picker({ label, value, setValue, type, hint }: Props) {
    let items = []
    switch (type) {
        case 'month':
            items = months
            break
    }

    return (
        <View>
            <InputLabel title={label} hint={hint} />
            <RNPickerSelect
                value={value}
                onValueChange={setValue}
                placeholder={{}}
                useNativeAndroidPickerStyle={false}
                style={{
                    inputAndroidContainer: {
                        backgroundColor: colors.white,
                        borderWidth: 1,
                        borderRadius: 14,
                        borderColor: colors.gray[400],
                        paddingLeft: 8,
                        paddingVertical: 1.4,
                    },
                    inputAndroid: {
                        fontSize: 14,
                        includeFontPadding: false,
                        color: colors.gray[800],
                        paddingRight: 30, // to ensure the text is never behind the icon
                    },
                }}
                items={items}
            />
        </View>
    )
}
