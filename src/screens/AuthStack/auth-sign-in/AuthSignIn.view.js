import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    CustomizedContainer,
    CustomizedButton,
    AnimatedFadeDown,
    CustomizedText,
    AnimatedHeader,
} from '@components';
import useLocalization from '@core/localization';
import styles from './AuthSignIn.styles';
import useAuthSignIn from './useAuthSignIn';
import { useHeaderHeight } from '@react-navigation/stack';

const AuthSignIn = ({ navigation }) => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();
    const headerHeight = useRef(useHeaderHeight()).current;

    const { onPressSignIn, onBack } = useAuthSignIn({ navigation });

    const _renderMainOverlay = () => {
        return (
            <AnimatedFadeDown style={styles.pos_overlay}>
                <CustomizedContainer type={'white_overlay'}>
                    <CustomizedButton
                        type={'primary'}
                        onPress={onPressSignIn}
                        containerStyle={styles.bt_sign_in}
                    >
                        Sign in
                    </CustomizedButton>
                    <CustomizedButton
                        onPress={onBack}
                        type={'secondary'}
                        containerStyle={styles.bt_sign_up}
                    >
                        back
                    </CustomizedButton>
                </CustomizedContainer>
            </AnimatedFadeDown>
        );
    };

    const _renderTitle = () => {
        return (
            <AnimatedFadeDown style={[styles.pos_title, { top: headerHeight }]}>
                <CustomizedText type={'title'}>Sign in</CustomizedText>
                <CustomizedText type={'subtitle'}>
                    {' '}
                    aerg arg aeg aeg ag gag aerg gae e ga erga
                </CustomizedText>
            </AnimatedFadeDown>
        );
    };

    return (
        <View style={styles.container}>
            <AnimatedHeader navigation={navigation} />
            <CustomizedContainer
                type={'main_theme'}
                containerStyle={styles.foreground}
            ></CustomizedContainer>
            {_renderTitle()}
            {_renderMainOverlay()}
        </View>
    );
};

export default AuthSignIn;
