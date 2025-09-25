import '../global.css'
import { Stack } from 'expo-router'
import { Header } from '@/components'
import colors from 'tailwindcss/colors'

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                header: (props) => <Header title={props.options.title} />,
                contentStyle: { backgroundColor: colors.gray[100] },
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Starting Point' }} />
        </Stack>
    )
}
