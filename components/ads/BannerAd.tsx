import { useRef, useContext } from 'react'
import { AdsContext } from './AdsContext'
import { Platform } from 'react-native'
import {
    TestIds,
    BannerAd as LibBannerAd,
    BannerAdSize,
    useForeground,
} from 'react-native-google-mobile-ads'

export function BannerAd() {
    const { isSdkInitialized, canRequestAds } = useContext(AdsContext)
    const bannerRef = useRef<LibBannerAd>(null)

    // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
    // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load()
    })

    if (!(isSdkInitialized && canRequestAds)) return null

    return (
        <LibBannerAd
            ref={bannerRef}
            unitId={TestIds.ADAPTIVE_BANNER}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
    )
}
