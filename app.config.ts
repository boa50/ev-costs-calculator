const IS_PRD = process.env.APP_VARIANT === 'production'
const IS_PREVIEW = process.env.APP_VARIANT === 'preview'

const getUniqueIdentifier = () => {
    if (IS_PRD) return 'com.boa50.evcostscalculator'
    if (IS_PREVIEW) return 'com.boa50.evcostscalculator.preview'
    return 'com.boa50.evcostscalculator.dev'
}

const getAppName = () => {
    if (IS_PRD) return 'Ev Costs'
    if (IS_PREVIEW) return 'Ev Costs (Preview)'
    return 'Ev Costs (Dev)'
}

const conf = ({ config }: { config: any }) => ({
    ...config,
    name: getAppName(),
    ios: {
        ...config.ios,
        bundleIdentifier: getUniqueIdentifier(),
    },
    android: {
        ...config.android,
        package: getUniqueIdentifier(),
    },
})

export default conf
