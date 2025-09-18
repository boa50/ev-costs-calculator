import '../global.css'
import { Stack } from 'expo-router'
import colors from 'tailwindcss/colors'

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.gray[300],
                },
                contentStyle: { backgroundColor: colors.gray[100] },
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Starting Point' }} />
        </Stack>
    )
}
