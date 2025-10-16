import { useState, useEffect, useContext } from 'react'
import { AdsContext } from './AdsContext'
import { Image, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
    NativeAd as LibNativeAd,
    TestIds,
    NativeAdView,
    NativeAsset,
    NativeMediaView,
    NativeAssetType,
    NativeMediaAspectRatio,
} from 'react-native-google-mobile-ads'

export const NativeAd = () => {
    const { t } = useTranslation()
    const { isSdkInitialized, canRequestAds } = useContext(AdsContext)
    const [nativeAd, setNativeAd] = useState<LibNativeAd>()
    const iconSize = 20

    useEffect(() => {
        LibNativeAd.createForAdRequest(TestIds.NATIVE, {
            aspectRatio: NativeMediaAspectRatio.ANY,
            startVideoMuted: true,
        })
            .then(setNativeAd)
            .catch(console.error)
    }, [])

    if (!nativeAd) return null
    if (!(isSdkInitialized && canRequestAds)) return null

    return (
        // Wrap all the ad assets in the NativeAdView component, and register the view with the nativeAd prop
        <NativeAdView nativeAd={nativeAd}>
            {/* // Display the headline asset with Text component, and use
            NativeAsset to register the view */}
            {/* <NativeAsset assetType={NativeAssetType.HEADLINE}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {nativeAd.headline}
                </Text>
            </NativeAsset> */}

            <View className="absolute z-50">
                <View className="flex-row">
                    {/* // Display the icon asset with Image component, and use NativeAsset
            to register the view */}
                    {nativeAd.icon && (
                        <NativeAsset assetType={NativeAssetType.ICON}>
                            <Image
                                source={{ uri: nativeAd.icon.url }}
                                width={iconSize}
                                height={iconSize}
                            />
                        </NativeAsset>
                    )}

                    {/* // Always display an ad attribution to denote that the view is an
            advertisement */}
                    <Text className="bg-gray-50 py-px px-1 text-sm">
                        {t('adds.description')}
                    </Text>
                </View>
            </View>

            {/* // Display the media asset */}
            <NativeMediaView resizeMode={'cover'} />
        </NativeAdView>
    )
}
