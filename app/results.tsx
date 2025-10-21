import { useCostsContext } from '@/contexts/CostsContext'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { CostsCard, RecoverInvestmentCard } from '@/features/CostsCard'
import { Container, ContentContainer } from '@/components'
import { BannerAd } from '@/components/ads/BannerAd'

export default function Results() {
    const { costsState } = useCostsContext()
    const { electric, gas, economy, initialCost } = costsState
    const { t } = useTranslation()

    return (
        <Container>
            <ContentContainer>
                <View className="gap-4">
                    {electric && (
                        <CostsCard
                            title={t('results.costsCards.headers.ev')}
                            data={electric}
                            icon="electricity"
                        />
                    )}
                    {gas && (
                        <CostsCard
                            title={t('results.costsCards.headers.gas')}
                            data={gas}
                            icon="gas"
                        />
                    )}
                    {economy && (
                        <>
                            <CostsCard
                                title={t('results.costsCards.headers.economy')}
                                data={economy}
                                icon="money"
                            />
                            {initialCost !== undefined && (
                                <RecoverInvestmentCard
                                    data={economy}
                                    initialCost={initialCost}
                                />
                            )}
                        </>
                    )}
                </View>
            </ContentContainer>
            <BannerAd />
        </Container>
    )
}
