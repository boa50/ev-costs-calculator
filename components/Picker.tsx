import { View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { InputLabel } from './InputLabel'
import { useTranslation } from 'react-i18next'
import colors from '@/colors'

interface Props {
    label?: string
    value: string
    setValue: (value: string) => void
    type: 'month'
    hint?: string
}

export function Picker({ label, value, setValue, type, hint }: Props) {
    const { t } = useTranslation()

    let items = []
    switch (type) {
        case 'month':
            items = [
                { label: t('components.picker.january'), value: '1' },
                { label: t('components.picker.february'), value: '2' },
                { label: t('components.picker.march'), value: '3' },
                { label: t('components.picker.april'), value: '4' },
                { label: t('components.picker.may'), value: '5' },
                { label: t('components.picker.june'), value: '6' },
                { label: t('components.picker.july'), value: '7' },
                { label: t('components.picker.august'), value: '8' },
                { label: t('components.picker.september'), value: '9' },
                { label: t('components.picker.october'), value: '10' },
                { label: t('components.picker.november'), value: '11' },
                { label: t('components.picker.december'), value: '12' },
            ]
            break
    }

    return (
        <View>
            <InputLabel title={label} hint={hint} isInputValid={true} />
            <RNPickerSelect
                value={value}
                onValueChange={setValue}
                placeholder={{}}
                useNativeAndroidPickerStyle={false}
                style={{
                    inputAndroidContainer: {
                        backgroundColor: colors.background.input,
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
