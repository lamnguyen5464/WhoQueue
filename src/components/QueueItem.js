import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SharedStyles from '@utils/SharedStyles';
import { DefaultSize, TextSize } from '@utils/Constants';
import { CustomizedText } from '.';
import Colors from '@utils/Colors';
import { Icon } from 'react-native-elements';
import { formatBasicDate } from '@utils/DateUtils';

const QueueItem = ({ data = {}, goToQueueDetail = () => null }) => {
    const { name, theme, address, hostName, status, startDate, endDate } = data;

    const _renderLine = () => <View style={styles.line} />;

    const _renderHeader = () => (
        <CustomizedText type="title_dark" textStyle={styles.title}>
            {name}
        </CustomizedText>
    );

    const _renderContent = (icon = '', content = '') => (
        <View style={styles.container_date}>
            <Icon
                name={icon || ''}
                type="ionicon"
                color={Colors.black_09}
                style={styles.iconDate}
            />
            <CustomizedText type="light_content">{content}</CustomizedText>
        </View>
    );

    const _renderTag = () => <View style={styles.tag(theme)} />;

    const onPressItem = () => {
        goToQueueDetail(data);
    };

    return (
        <TouchableOpacity onPress={onPressItem} style={styles.container} activeOpacity={0.7}>
            {_renderHeader()}
            {_renderContent('people-outline', hostName)}
            {_renderLine()}
            {_renderContent('location-outline', address)}
            {_renderContent('calendar-outline', formatBasicDate(startDate))}
            {_renderContent('calendar-outline', formatBasicDate(endDate))}
            {_renderTag()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        ...SharedStyles.shadow,
        flex: 1,
        borderRadius: DefaultSize.S,
        padding: DefaultSize.M,
        marginBottom: DefaultSize.S,
        backgroundColor: 'white',
    },
    title: {},
    line: {
        height: 1,
        width: '100%',
        marginVertical: DefaultSize.S,
        backgroundColor: Colors.black_07,
    },
    iconDate: {
        marginRight: DefaultSize.S,
    },
    container_date: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tag: (theme = Colors.primary_1) => ({
        position: 'absolute',
        backgroundColor: theme,
        top: 0,
        right: '10%',
        width: '30%',
        height: DefaultSize.S,
        borderRadius: DefaultSize.S,
    }),
});

export default memo(QueueItem);
