import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    CustomizedContainer,
    CustomizedButton,
    AnimatedFadeDown,
    CustomizedInput,
    CustomizedText,
    AnimatedHeader,
    QRCodeView,
} from '@components';
import useLocalization from '@core/localization';
import useQueueDetail from './useQueueDetail';
import { useHeaderHeight } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import Colors from '@utils/Colors';
import { DefaultSize } from '@utils/Constants';
import { formatBasicDate } from '@utils/DateUtils';

const QueueDetail = props => {
    const { LOCALIZATION_ENUMS, LOCALIZED_CONTENT, setLocalization } = useLocalization();
    const headerHeight = useRef(useHeaderHeight()).current;

    const { navigation } = props;

    const {
        name,
        theme,
        address,
        hostName,
        status,
        startDate,
        endDate,
        roomId,
        userId,
        haveJoined,

        onPressSignIn,
        onPressFacebook,
        errorText,
    } = useQueueDetail(props);

    const _renderMainOverlay = () => {
        return (
            <AnimatedFadeDown style={[styles.pos_overlay, { top: headerHeight }]}>
                {_renderTitle()}
                <CustomizedContainer type={'white_overlay'}>
                    <View style={styles.row}>
                        {_renderInfo()}
                        {_renderQRCode()}
                    </View>
                    <CustomizedButton
                        type={'primary'}
                        onPress={onPressSignIn}
                        componentStyle={styles.cta_confirm(theme)}
                    >
                        join?
                    </CustomizedButton>
                </CustomizedContainer>
            </AnimatedFadeDown>
        );
    };

    const _renderInfo = () => (
        <View style={styles.container_info}>
            {_renderContent('location-outline', address)}
            {_renderContent('calendar-outline', formatBasicDate(startDate))}
            {_renderContent('calendar-outline', formatBasicDate(endDate))}
        </View>
    );

    const _renderQRCode = () =>
        haveJoined ? <QRCodeView value={userId} style={styles.qrcode_view} /> : null;

    const _renderForeground = () => (
        <CustomizedContainer
            type={'main_theme'}
            containerStyle={styles.foreground(theme)}
        ></CustomizedContainer>
    );

    const _renderContent = (icon = '', content = '') => (
        <View style={styles.container_sub_content}>
            <Icon
                name={icon || ''}
                type="ionicon"
                color={Colors.black_09}
                style={styles.iconDate}
            />
            <CustomizedText type="light_content">{content}</CustomizedText>
        </View>
    );

    const _renderTitle = () => {
        return (
            <View style={[styles.pos_title]}>
                <CustomizedText type={'title'}>{name}</CustomizedText>
                <CustomizedText type={'subtitle'}>{hostName}</CustomizedText>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <AnimatedHeader
                navigation={navigation}
                iconRight={'share-outline'}
                onPressHeaderRight={() => {
                    console.log('share');
                }}
            />
            {_renderForeground()}
            {_renderMainOverlay()}
        </View>
    );
};

export default QueueDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black_05,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    qrcode_view: {
        height: 'auto',
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'flex-start',
    },
    foreground: (theme = Colors.primary_1) => ({
        height: '35%',
        borderBottomLeftRadius: DefaultSize.S,
        borderBottomRightRadius: DefaultSize.S,
        backgroundColor: [theme, theme],
    }),
    pos_overlay: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pos_title: {
        width: '90%',
        alignSelf: 'center',
        marginVertical: DefaultSize.L,
    },
    cta_confirm: (theme = Colors.primary_1) => ({
        marginTop: DefaultSize.M,
        backgroundColor: [theme, theme],
    }),
    container_sub_content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconDate: {
        marginRight: DefaultSize.S,
    },
    container_info: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
