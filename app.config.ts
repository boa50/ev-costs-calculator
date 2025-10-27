const IS_PRD = process.env.APP_VARIANT === 'production'
const IS_PREVIEW = process.env.APP_VARIANT === 'preview'

const getUniqueIdentifier = () => {
    const packageName = 'com.boa50.evcostscalculator'

    if (IS_PRD) return packageName
    if (IS_PREVIEW) return packageName + '.preview'
    return packageName + '.dev'
}

const getAppEnvName = () => {
    if (IS_PRD) return ''
    if (IS_PREVIEW) return ' (Preview)'
    return ' (Dev)'
}

const conf = ({ config }: { config: any }) => ({
    ...config,
    name: config.name + getAppEnvName(),
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
