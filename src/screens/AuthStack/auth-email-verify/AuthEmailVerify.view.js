import React, { useRef, memo } from 'react';
import { View, TextInput } from 'react-native';
import {
    CustomizedContainer,
    CustomizedInputOTP,
    CustomizedButton,
    AnimatedFadeDown,
    CustomizedInput,
    CustomizedText,
    AnimatedHeader,
} from '@components';
import useLocalization from '@core/localization';
import styles from './AuthEmailVerify.styles';
import useAuthEmailVerify from './useAuthEmailVerify';
import { useHeaderHeight } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SocialIcon } from 'react-native-elements';

const AuthEmailVerify = ({ navigation }) => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();
    const headerHeight = useRef(useHeaderHeight()).current;

    const {
        onPressConfirmOTP,
        onPressSendOTP,
        onPressFacebook,
        isShowOTPInput,
        onChangeEmail,
        refInputEmail,
        refInputOTP,
        loadingCTA,
        errorText,
    } = useAuthEmailVerify({
        navigation,
    });

    const _renderMainOverlay = () => {
        return (
            <AnimatedFadeDown style={styles.pos_overlay}>
                {_renderInputComponents()}
                {_renderTextOr()}
                {_renderSocial()}
            </AnimatedFadeDown>
        );
    };

    const _renderInputComponents = () => (
        <CustomizedContainer type={'white_overlay'}>
            {_renderInputEmail()}
            {_renderInputOTP()}
            {_renderCTA()}
            {_renderTextError()}
            {_renderTextResend()}
        </CustomizedContainer>
    );

    const _renderInputEmail = () => (
        <CustomizedInput
            ref={refInputEmail}
            icon={'mail'}
            placeholder={'Email'}
            onChangeValue={onChangeEmail}
        />
    );

    const _renderInputOTP = () =>
        isShowOTPInput ? (
            <AnimatedFadeDown style={styles.container_OTP}>
                <CustomizedInputOTP ref={refInputOTP} onDone={onPressConfirmOTP} />
            </AnimatedFadeDown>
        ) : null;

    const _renderCTA = () => (
        <CustomizedButton
            type={'primary'}
            onPress={!isShowOTPInput ? onPressSendOTP : onPressConfirmOTP}
            containerStyle={styles.cta_confirm}
            loading={loadingCTA}
        >
            {isShowOTPInput ? 'Confirm otp' : 'send OTP'}
        </CustomizedButton>
    );

    const _renderTextResend = () =>
        isShowOTPInput ? (
            <TouchableOpacity onPress={onPressSendOTP} activeOpacity={0.8}>
                <CustomizedText type={'subtitle_dark'} textStyle={styles.text_resend}>
                    {'Cannot recieved OTP? '}
                    <CustomizedText type={'secondary'}>{'Resend'}</CustomizedText>
                </CustomizedText>
            </TouchableOpacity>
        ) : null;

    const _renderTextError = () =>
        errorText ? (
            <CustomizedText type={'error'} textStyle={styles.text_resend}>
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
                <CustomizedText type={'title'}>OTP </CustomizedText>
                <CustomizedText type={'subtitle'}>Veriragae aerg aerg</CustomizedText>
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

export default memo(AuthEmailVerify);
