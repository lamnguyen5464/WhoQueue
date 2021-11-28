import React, { useRef } from 'react';
import { View } from 'react-native';
import {
    CustomizedContainer,
    CustomizedButton,
    AnimatedFadeDown,
    CustomizedInput,
    CustomizedText,
    AnimatedHeader,
} from '@components';
import useLocalization from '@core/localization';
import styles from './AuthSignIn.styles';
import useAuthSignIn from './useAuthSignIn';
import { useHeaderHeight } from '@react-navigation/stack';
import { SocialIcon } from 'react-native-elements';

const AuthSignIn = ({ navigation }) => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();
    const headerHeight = useRef(useHeaderHeight()).current;

    const { onPressSignIn, onPressFacebook, errorText, refInputEmail, refInputPassword } =
        useAuthSignIn({
            navigation,
        });

    const _renderMainOverlay = () => {
        return (
            <AnimatedFadeDown style={styles.pos_overlay}>
                {_renderInput()}
                {_renderTextOr()}
                {_renderSocial()}
            </AnimatedFadeDown>
        );
    };

    const _renderInput = () => (
        <CustomizedContainer type={'white_overlay'}>
            <CustomizedInput ref={refInputEmail} icon={'mail'} placeholder={'Email'} />
            <CustomizedInput
                ref={refInputPassword}
                icon={'lock-closed'}
                containerStyle={styles.container_password}
                placeholder={'Password'}
                isPassword={true}
            />

            <CustomizedButton
                type={'primary'}
                onPress={onPressSignIn}
                containerStyle={styles.cta_confirm}
            >
                Signnn in
            </CustomizedButton>
            {_renderTextError()}
        </CustomizedContainer>
    );

    const _renderTextError = () =>
        errorText ? (
            <CustomizedText type={'error'} textStyle={styles.text_error}>
                *{errorText}
            </CustomizedText>
        ) : null;

    const _renderTextOr = () => (
        <CustomizedText type={'subtitle_dark'} textStyle={styles.text_or}>
            or use
        </CustomizedText>
    );

    const _renderSocial = () => (
        <CustomizedContainer type={'white_overlay'} containerStyle={styles.container_social}>
            <SocialIcon
                onPress={onPressFacebook}
                raised={true}
                type="facebook"
                style={styles.icon_social}
            />
            <SocialIcon raised={true} type="google" style={styles.icon_social} />
            <SocialIcon raised={true} type="twitter" style={styles.icon_social} />
        </CustomizedContainer>
    );

    const _renderForeground = () => (
        <CustomizedContainer
            type={'main_theme'}
            containerStyle={styles.foreground}
        ></CustomizedContainer>
    );

    const _renderTitle = () => {
        return (
            <View style={[styles.pos_title, { top: headerHeight }]}>
                <CustomizedText type={'title'}>Sign in</CustomizedText>
                <CustomizedText type={'subtitle'}>
                    {' '}
                    aerg arg aeg aeg ag gag aerg gae e ga erga
                </CustomizedText>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <AnimatedHeader navigation={navigation} />
            {_renderForeground()}
            {_renderTitle()}
            {_renderMainOverlay()}
        </View>
    );
};

export default AuthSignIn;
