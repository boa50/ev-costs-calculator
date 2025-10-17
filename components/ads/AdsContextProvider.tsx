//Based on https://www.reddit.com/r/expo/comments/1l1mjsv/my_solution_to_consent_management_with/

import { PropsWithChildren, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency'
import { AdsContext } from './AdsContext'
import mobileAds, {
    MaxAdContentRating,
    AdsConsent,
    AdsConsentStatus,
    AdsConsentPrivacyOptionsRequirementStatus,
    AdsConsentDebugGeography,
} from 'react-native-google-mobile-ads'

export default function AdsContextProvider({ children }: PropsWithChildren) {
    const [isSdkInitialized, setIsSdkInitialized] = useState(false)
    const [canRequestAds, setCanRequestAds] = useState(false)
    const [formAvailable, setFormAvailable] = useState(false)

    // check consent status on app launch
    useEffect(() => {
        prepareConsentInfo()
        /* eslint-disable-next-line -- This should be run only on app startup */
    }, [])

    /**
     * 1. Request consent information update
     * 2. Check if user is in EEA (GDRP applies)
     * 3. Move forward based on consentInfo and gdrpApplies:
     *      3a. If consent is not required, proceed to start SDK
     *      3b. If consent is obtained, check if the user is in the EEA (GDPR applies)
     *      if user is in EEA, call checkConsent(), else, proceed to start SDK
     *      3c. If consent status is REQUIRED or UNKNOWN, check if user is in EEA
     *      if user is in EEA, request GDRP form. Otherwise, present the US regulation form if required/available
     */
    async function prepareConsentInfo() {
        const consentInfo = await getConsentInfo()
        const gdprApplies = await AdsConsent.getGdprApplies()

        // check status of consent form, used in Settings to determine whether to display privacy options form
        const form = consentInfo.isConsentFormAvailable
        setFormAvailable(form)
        if (consentInfo.status === AdsConsentStatus.NOT_REQUIRED) {
            setCanRequestAds(true)
            startGoogleMobileAdsSDK()
        } else if (consentInfo.status === AdsConsentStatus.OBTAINED) {
            if (gdprApplies) {
                checkConsentGDPR()
            } else {
                setCanRequestAds(true)
                startGoogleMobileAdsSDK()
            }
        } else if (gdprApplies) {
            gatherConsentGDPR()
        }

        if (
            !gdprApplies &&
            consentInfo.privacyOptionsRequirementStatus ===
                AdsConsentPrivacyOptionsRequirementStatus.REQUIRED
        ) {
            gatherConsentRegulatedUSState()
        }
    }

    /** Present GDRP consent form, then go to checkConsentGDRP */
    async function gatherConsentGDPR() {
        await AdsConsent.loadAndShowConsentFormIfRequired()
            // await AdsConsent.gatherConsent() NOT WORKING
            .then(checkConsentGDPR)
            .catch((error) => console.error('Consent gathering failed:', error))
    }

    /** Determine whether user can be shown ads at all based on their selection to:
     *      a. Store and Access Information on Device
     *      b. Basic consent for advertising
     *  If user has accepted basic ads, set canRequestAds to true and start SDK
     *  Otherwise, do not start SDK and leave canRequestAds false
     */
    async function checkConsentGDPR() {
        const consentInfo = await getConsentInfo()
        const userChoices = await AdsConsent.getUserChoices()

        // manually check for at least basic consent before requesting ads
        const hasBasicConsent =
            userChoices.storeAndAccessInformationOnDevice &&
            userChoices.selectBasicAds

        const finalCanRequestAds = consentInfo.canRequestAds && hasBasicConsent

        setCanRequestAds(finalCanRequestAds)

        if (finalCanRequestAds) startGoogleMobileAdsSDK()
    }

    /** Use gatherConsent to show US Regulated State form if required, then start SDK */
    async function gatherConsentRegulatedUSState() {
        await AdsConsent.loadAndShowConsentFormIfRequired()
            // await AdsConsent.gatherConsent() NOT WORKING
            .then(startGoogleMobileAdsSDK)
            .catch((error) => console.error('Consent gathering failed:', error))

        setCanRequestAds(true)
    }

    /** Called by startGoogleMobileAdsSDK. If user can receive ads at all, either by GDRP consent or local laws, request ATT tracking permissions on IOS */
    async function gatherATTConsentIOS() {
        const gdprApplies = await AdsConsent.getGdprApplies()
        const hasConsentForPurposeOne =
            gdprApplies &&
            (await AdsConsent.getPurposeConsents()).startsWith('1')
        if (!gdprApplies || hasConsentForPurposeOne) {
            await requestTrackingPermissionsAsync()
        }
    }

    /** If user has consented to received ads at all or is allowed by local laws, request ATT on IOS and start the SDK */
    async function startGoogleMobileAdsSDK() {
        if (Platform.OS === 'ios') {
            await gatherATTConsentIOS()
        }

        if (!isSdkInitialized) {
            mobileAds().setRequestConfiguration({
                // Update all future requests suitable for parental guidance
                maxAdContentRating: MaxAdContentRating.PG,

                // Indicates that you want your content treated as child-directed for purposes of COPPA.
                tagForChildDirectedTreatment: true,

                // Indicates that you want the ad request to be handled in a
                // manner suitable for users under the age of consent.
                tagForUnderAgeOfConsent: true,

                // An array of test device IDs to allow.
                testDeviceIdentifiers: ['EMULATOR'],
            })

            await mobileAds().initialize()
            setIsSdkInitialized(true)
        }
    }

    /**
     * Used when user requests to update consent
     *  If user is in EEA (GDRP applies), show the GDRP consent form and then check consent status based on GDRP.
     *  Otherwise, show the US-Regulation tracking form.
     *
     *  Note: no need to implement ability to update ATT tracking info within the app, as Apple does not require it and users can do so in iPhone settings
     *
     */
    async function showPrivacyOptions() {
        const gdrpApplies = await AdsConsent.getGdprApplies()
        if (gdrpApplies) {
            await AdsConsent.showForm().then(checkConsentGDPR)
        } else await AdsConsent.showForm()
    }

    const contextValues = {
        isSdkInitialized,
        canRequestAds,
        formAvailable,
        showPrivacyOptions,
    }

    return (
        <AdsContext.Provider value={contextValues}>
            {children}
        </AdsContext.Provider>
    )
}

async function getConsentInfo() {
    let testOptions = {}
    const consentInfoTest = process.env.EXPO_PUBLIC_CONSENT_INFO_TEST

    if (consentInfoTest !== undefined) {
        let debugGeography = AdsConsentDebugGeography.OTHER

        if (consentInfoTest === 'EEA')
            debugGeography = AdsConsentDebugGeography.EEA
        if (consentInfoTest === 'US')
            debugGeography = AdsConsentDebugGeography.REGULATED_US_STATE

        testOptions = {
            debugGeography: debugGeography,
            testDeviceIdentifiers: [
                'EMULATOR',
                process.env.EXPO_PUBLIC_CONSENT_INFO_TEST_DEVICE_ID ?? '',
            ],
        }
    }

    return await AdsConsent.requestInfoUpdate(testOptions)
}
