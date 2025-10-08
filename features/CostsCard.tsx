import { View, Text } from 'react-native'
import { formatMonetaryNumber, showNumberSingularOrPlural } from '@/utils'
import type { Costs, Economy } from '@/types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import colors from 'tailwindcss/colors'

type Icon = 'electricity' | 'gas' | 'money'

interface CostsCardProps {
    title: string
    data: Costs | Economy
    icon?: Icon
}

export function CostsCard({ title, data, icon }: CostsCardProps) {
    return (
        <View className="bg-white p-2 shadow-gray-300 shadow-sm rounded-md">
            <View className="flex-row gap-1 items-center mb-1">
                {icon !== undefined && <CostsIcon icon={icon} />}
                <Text className="font-medium text-sky-800">{title}</Text>
            </View>
            <Text className="text-gray-800">
                Annual: {formatMonetaryNumber(data.annual)}
            </Text>
            <Text className="text-gray-800">
                Montlhy: {formatMonetaryNumber(data.monthly)}
            </Text>
            <Text className="text-gray-800">
                Total per year: {formatMonetaryNumber(data.perYear)}
            </Text>
        </View>
    )
}

function CostsIcon({ icon }: { icon: Icon }) {
    const iconSize = 14
    const iconColour = colors.sky[800]

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
    return (
        <View>
            {initialCost > 0 &&
                (data.isMaxYears ? (
                    <Text className="pt-2">
                        You will take more than {data.numYears} years to recover
                        the {formatMonetaryNumber(initialCost)} initial cost
                    </Text>
                ) : (
                    <Text className="pt-2">
                        {`You will take ${showNumberSingularOrPlural(
                            data.numYears ?? 0,
                            'year',
                            'years'
                        )} and ${showNumberSingularOrPlural(
                            data.numMonths ?? 0,
                            'month',
                            'months'
                        )} to recover the ${formatMonetaryNumber(initialCost)} initial cost`}
                    </Text>
                ))}
        </View>
    )
}
