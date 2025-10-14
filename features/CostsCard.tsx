import { View, Text } from 'react-native'
import { formatMonetaryNumber, showNumberSingularOrPlural } from '@/utils'
import { useTranslation } from 'react-i18next'
import type { Costs, Economy } from '@/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import colors from '@/colors'

type Icon = 'electricity' | 'gas' | 'money'

interface CostsCardProps {
    title: string
    data: Costs | Economy
    icon?: Icon
}

export function CostsCard({ title, data, icon }: CostsCardProps) {
    const { t } = useTranslation()

    return (
        <View className="bg-background-card p-2 shadow-gray-300 shadow-sm rounded-md">
            <View className="flex-row gap-1 items-center mb-1">
                {icon !== undefined && <CostsIcon icon={icon} />}
                <Text className="font-medium text-accent-standard">
                    {title}
                </Text>
            </View>
            <Text className="text-text-dark">
                {t('form.costsCards.shared.annual')}:{' '}
                {formatMonetaryNumber(data.annual)}
            </Text>
            <Text className="text-text-dark">
                {t('form.costsCards.shared.monthly')}:{' '}
                {formatMonetaryNumber(data.monthly)}
            </Text>
            <Text className="text-text-dark">
                {t('form.costsCards.shared.totalPerYear')}:{' '}
                {formatMonetaryNumber(data.perYear)}
            </Text>
        </View>
    )
}

function CostsIcon({ icon }: { icon: Icon }) {
    const iconSize = 14
    const iconColour = colors.icon.dark

    switch (icon) {
        case 'electricity':
            return (
                <MaterialIcons
                    name="offline-bolt"
                    size={iconSize}
                    color={iconColour}
                />
            )
        case 'gas':
            return (
                <MaterialIcons
                    name="local-gas-station"
                    size={iconSize}
                    color={iconColour}
                />
            )
        case 'money':
            return (
                <FontAwesome6
                    name="sack-dollar"
                    size={iconSize}
                    color={iconColour}
                />
            )
    }
}

interface RecoverInvestmentCardProps {
    data: Economy
    initialCost: number
}

export function RecoverInvestmentCard({
    data,
    initialCost,
}: RecoverInvestmentCardProps) {
    const { t } = useTranslation()

    return (
        <View>
            {initialCost > 0 &&
                (data.isMaxYears ? (
                    <Text className="pt-2">
                        {t('form.recoverInvestmentCard.exceeding', {
                            numYears: data.numYears,
                            initialCost: formatMonetaryNumber(initialCost),
                        })}
                    </Text>
                ) : (
                    <Text className="pt-2">
                        {t('form.recoverInvestmentCard.default', {
                            numTextYears: showNumberSingularOrPlural(
                                data.numYears ?? 0,
                                t('general.year.singular'),
                                t('general.year.plural')
                            ),
                            numTextMonths: showNumberSingularOrPlural(
                                data.numMonths ?? 0,
                                t('general.month.singular'),
                                t('general.month.plural')
                            ),
                            initialCost: formatMonetaryNumber(initialCost),
                        })}
                    </Text>
                ))}
        </View>
    )
}
