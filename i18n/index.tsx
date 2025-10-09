import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from 'expo-localization'
import translationEn from './locales/en-AU/translations.json'
import translationBr from './locales/pt-BR/translations.json'

export const resources = {
    'en-AU': { translation: translationEn },
    en: { translation: translationEn },
    'pt-BR': { translation: translationBr },
    pt: { translation: translationBr },
}

const initI18n = async () => {
    try {
        let selectedLanguage = 'en-AU'

        const deviceLocales = getLocales()
        const deviceLocale = deviceLocales[0]?.languageTag || 'en-AU'
        const languageCode = deviceLocale.split('-')[0]

        if (deviceLocale in resources) selectedLanguage = deviceLocale
        else if (languageCode in resources) selectedLanguage = languageCode

        await i18n.use(initReactI18next).init({
            resources,
            lng: selectedLanguage,
            fallbackLng: {
                'en-*': ['en-AU', 'en'],
                'pt-*': ['pt-BR', 'pt', 'en-AU'],
                default: ['en-AU'],
            },
            interpolation: {
                escapeValue: false,
            },
            react: {
                useSuspense: false,
            },
        })
    } catch (error) {
        console.error('Error initializing i18n:', error)

        await i18n.use(initReactI18next).init({
            resources,
            lng: 'en-US',
            fallbackLng: 'en-US',
            interpolation: {
                escapeValue: false,
            },
            react: {
                useSuspense: false,
            },
        })
    }
}

initI18n()

export default i18n
