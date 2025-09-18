import { Text, View, TextInput } from 'react-native'

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text className="font-extrabold text-red-600 text-6xl">
                It is already edited
            </Text>
        </View>
    )
}
