import { useState } from 'react'
import { View } from 'react-native'
import Input from '@/components/Input'

export default function Index() {
    const [value, setValue] = useState<string>('')

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Input
                label="some label"
                value={value}
                setValue={setValue}
                keyboardType="number-pad"
            />
        </View>
    )
}
