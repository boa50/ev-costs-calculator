import '@/global.css'
import '@/i18n'
import { Stack } from 'expo-router'
import { Header, ToastProvider } from '@/components'
import { useTranslation } from 'react-i18next'
import AdsContextProvider from '@/components/ads/AdsContextProvider'
import { validateLocalStorageUnits } from '@/utils'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CostsProvider, LayoutProvider } from '@/contexts'
import colors from '@/colors'
import type { ReactNode } from 'react'

export default function RootLayout() {
    validateLocalStorageUnits()
    const { t } = useTranslation()

    return (
        <Providers>
            <Stack
                screenOptions={{
                    header: (props) => (
                        <Header
                            title={props.options.title}
                            routeName={props.route.name}
                        />
                    ),
                    contentStyle: {
                        backgroundColor: colors.background.app,
                    },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: t('headers.calculateCosts'),
                    }}
                />
                <Stack.Screen
                    name="manageUnits"
                    options={{
                        title: t('headers.manageUnits'),
                    }}
                />
                <Stack.Screen
                    name="results"
                    options={{ title: t('headers.results') }}
                />
            </Stack>
        </Providers>
    )
}

function Providers({ children }: { children: ReactNode }) {
    return (
        <CostsProvider>
            <LayoutProvider>
                <SafeAreaProvider>
                    <AdsContextProvider>
                        <ToastProvider>{children}</ToastProvider>
                    </AdsContextProvider>
                </SafeAreaProvider>
            </LayoutProvider>
        </CostsProvider>
    )
}
