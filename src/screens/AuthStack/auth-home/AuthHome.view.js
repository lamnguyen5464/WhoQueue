import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    CustomizedContainer,
    CustomizedText,
    CustomizedButton,
    AnimatedFadeDown,
} from '@components';
import useLocalization from '@core/localization';
import styles from './AuthHome.styles';
import useAuthHome from './useAuthHome';
import QRCodeModule from '@core/nativemodule/qrcode/QRCodeModule';

const AuthHome = ({ navigation }) => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization, getLocalization } =
        useLocalization();
    const { onPressSignIn, onPressSignUp } = useAuthHome({ navigation });

    const _renderMainOverlay = () => {
        return (
            <AnimatedFadeDown style={styles.pos_overlay}>
                <CustomizedContainer type={'white_overlay'}>
                    <CustomizedText type={'title_dark'}>
                        {LOCALIZED_CONTENT.welcomeBanner.heading}
                    </CustomizedText>
                    <CustomizedText type={'subtitle_dark'}>
                        {LOCALIZED_CONTENT.welcomeBanner.intro}
                    </CustomizedText>

                    <CustomizedButton
                        type={'primary'}
                        onPress={onPressSignIn}
                        containerStyle={styles.bt_sign_in}
                    >
                        {LOCALIZED_CONTENT.signIn}
                    </CustomizedButton>
                    <CustomizedButton
                        onPress={onPressSignUp}
                        type={'secondary'}
                        containerStyle={styles.bt_sign_up}
                    >
                        {LOCALIZED_CONTENT.register}
                    </CustomizedButton>
                </CustomizedContainer>
            </AnimatedFadeDown>
        );
    };

    const _renderSwitchLocale = () => {
        const currentLocale = getLocalization();
        return (
            <TouchableOpacity
                onPress={() => {
                    setLocalization(
                        currentLocale === LOCALIZATION_ENUMS.en
                            ? LOCALIZATION_ENUMS.vi
                            : LOCALIZATION_ENUMS.en
                    );
                }}
                activeOpacity={0.8}
                style={styles.container_locale}
            >
                {Object.keys(LOCALIZATION_ENUMS).map((item, index) => (
                    <View
                        key={`locale_${item}_${index}_${currentLocale}`}
                        style={
                            currentLocale === item ? styles.locale_active : styles.locale_inactive
                        }
                    >
                        <Text
                            style={
                                currentLocale === item
                                    ? styles.text_locale_active
                                    : styles.text_locale_inactive
                            }
                        >
                            {item}
                        </Text>
                    </View>
                ))}
            </TouchableOpacity>
        );
    };

    const _renderForeground = () => (
        <CustomizedContainer
            type={'main_theme'}
            containerStyle={styles.foreground}
        ></CustomizedContainer>
    );

    return (
        <View style={styles.container}>
            {_renderForeground()}
            {_renderMainOverlay()}
            {_renderSwitchLocale()}
        </View>
    );
};

export default AuthHome;
