import React, { useRef } from 'react';
import { View, TextInput } from 'react-native';
import {
    CustomizedContainer,
    CustomizedButton,
    AnimatedFadeDown,
    CustomizedInput,
    CustomizedText,
    AnimatedHeader,
} from '@components';
import useLocalization from '@core/localization';
import styles from './AuthRegister.styles';
import useAuthRegister from './useAuthRegister';
import { useHeaderHeight } from '@react-navigation/stack';

const AuthRegister = props => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();
    const headerHeight = useRef(useHeaderHeight()).current;
    const { refInputEmail } = useRef(null);
    const { navigation, route } = props;
    const { email } = route?.params || {};

    const { onPressRegister, refInputName, refInputPassword, refConfirmPassword } = useAuthRegister(
        {
            navigation,
        }
    );

    const _renderMainOverlay = () => {
        return <AnimatedFadeDown style={styles.pos_overlay}>{_renderInput()}</AnimatedFadeDown>;
    };

    const _renderInput = () => (
        <CustomizedContainer type={'white_overlay'}>
            <CustomizedInput
                ref={refInputName}
                icon={'person'}
                placeholder={'Full name'}
                autoCapitalize={'words'}
            />
            <CustomizedInput
                ref={refInputPassword}
                icon={'lock-closed'}
                containerStyle={styles.container_password}
                placeholder={'Password'}
                isPassword={true}
            />

            <CustomizedInput
                ref={refConfirmPassword}
                icon={'lock-open'}
                containerStyle={styles.container_password}
                placeholder={'Confirm pass'}
                isPassword={true}
            />

            <CustomizedButton
                type={'primary'}
                onPress={onPressRegister}
                containerStyle={styles.cta_confirm}
            >
                {LOCALIZED_CONTENT.register}
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
                <CustomizedText type={'title'}>Hi {email}</CustomizedText>
                <CustomizedText type={'subtitle'}>{'Hay dang ki blab albab albal'}</CustomizedText>
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

export default AuthRegister;
