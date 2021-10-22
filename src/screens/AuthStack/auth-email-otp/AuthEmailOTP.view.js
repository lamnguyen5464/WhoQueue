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
import styles from './AuthEmailOTP.styles';
import useAuthEmailOTP from './useAuthEmailOTP';
import { useHeaderHeight } from '@react-navigation/stack';

const AuthEmailOTP = ({ navigation }) => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();
    const headerHeight = useRef(useHeaderHeight()).current;

    const {
        onPressConfirmOTP,
        onPressSendOTP,
        isShowOTPInput,
        onChangeEmail,
        refInputEmail,
        refInputOTP,
        loadingCTA,
    } = useAuthEmailOTP({
        navigation,
    });

    const _renderMainOverlay = () => {
        return <AnimatedFadeDown style={styles.pos_overlay}>{_renderInput()}</AnimatedFadeDown>;
    };

    const _renderInput = () => (
        <CustomizedContainer type={'white_overlay'}>
            <CustomizedInput
                ref={refInputEmail}
                icon={'mail'}
                placeholder={'Email'}
                onChangeValue={onChangeEmail}
            />

            {isShowOTPInput ? (
                <AnimatedFadeDown style={styles.container_OTP}>
                    <CustomizedInputOTP ref={refInputOTP} onDone={onPressConfirmOTP} />
                </AnimatedFadeDown>
            ) : null}

            <CustomizedButton
                type={'primary'}
                onPress={!isShowOTPInput ? onPressSendOTP : onPressConfirmOTP}
                containerStyle={styles.cta_confirm}
                loading={loadingCTA}
            >
                {isShowOTPInput ? 'Confirm otp' : 'send OTP'}
            </CustomizedButton>
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

export default memo(AuthEmailOTP);
