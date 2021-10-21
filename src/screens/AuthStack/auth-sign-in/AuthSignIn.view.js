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
import styles from './AuthSignIn.styles';
import useAuthSignIn from './useAuthSignIn';
import { useHeaderHeight } from '@react-navigation/stack';
import { SocialIcon } from 'react-native-elements';

const AuthSignIn = ({ navigation }) => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();
    const headerHeight = useRef(useHeaderHeight()).current;
    const { refInputEmail } = useRef(null);

    const { onPressSignIn, onBack } = useAuthSignIn({ navigation });

    const _renderMainOverlay = () => {
        return (
            <AnimatedFadeDown style={styles.pos_overlay}>
                <CustomizedContainer type={'white_overlay'}>
                    <CustomizedInput ref={refInputEmail} />
                    <CustomizedButton
                        type={'primary'}
                        onPress={onPressSignIn}
                        containerStyle={styles.cta_confirm}
                    >
                        Send otp aefraer
                    </CustomizedButton>
                </CustomizedContainer>

                <CustomizedText type={'subtitle_dark'} textStyle={styles.text_or}>
                    or use
                </CustomizedText>

                <CustomizedContainer
                    type={'white_overlay'}
                    containerStyle={styles.container_social}
                >
                    <SocialIcon raised={true} type="facebook" />
                    <SocialIcon raised={true} type="google" />
                    <SocialIcon raised={true} type="twitter" />
                </CustomizedContainer>
            </AnimatedFadeDown>
        );
    };

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
