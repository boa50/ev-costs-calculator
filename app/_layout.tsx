import '../global.css'
import { Stack } from 'expo-router'
import { Header, ToastProvider } from '@/components'
import colors from 'tailwindcss/colors'

export default function RootLayout() {
    return (
        <ToastProvider>
            <Stack
                screenOptions={{
                    header: (props) => (
                        <Header
                            title={props.options.title}
                            routeName={props.route.name}
                        />
                    ),
                    contentStyle: { backgroundColor: colors.gray[100] },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{ title: 'Calculate Costs' }}
                />
                <Stack.Screen
                    name="manageUnits"
                    options={{ title: 'Manage Units' }}
                />
            </Stack>
        </ToastProvider>
    )
}
