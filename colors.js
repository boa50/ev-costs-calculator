import tailwindColors from 'tailwindcss/colors'

const colors = {
    accent: {
        standard: tailwindColors.teal[700],
    },
    text: {
        dark: tailwindColors.gray[800],
        'dark-faded': tailwindColors.gray[500],
        light: tailwindColors.white,
    },
    error: {
        standard: tailwindColors.orange[600],
        light: tailwindColors.orange[400],
    },
    icon: {
        dark: tailwindColors.teal[700],
        light: tailwindColors.white,
    },
    shadow: tailwindColors.gray[800],
    background: {
        app: tailwindColors.gray[100],
        input: tailwindColors.white,
        card: tailwindColors.white,
        info: tailwindColors.gray[600],
    },
    gray: {
        ...tailwindColors.gray,
    },
    transparent: tailwindColors.transparent,
}

export default colors
