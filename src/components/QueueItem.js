import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SharedStyles from '@utils/SharedStyles';
import { DefaultSize, TextSize } from '@utils/Constants';
import { CustomizedText } from '.';
import Colors from '@utils/Colors';
import { Icon } from 'react-native-elements';
import { formatBasicDate } from '@utils/DateUtils';

const QueueItem = ({ data = {} }) => {
    const { name, theme, address, hostName, status, startDate, endDate } = data;

    const _renderLine = () => <View style={styles.line} />;

    const _renderHeader = () => (
        <CustomizedText type="title_dark" textStyle={styles.title}>
            {name}
        </CustomizedText>
    );

    const _renderContent = content => (
        <CustomizedText type="light_content">{content}</CustomizedText>
    );

    const _renderDate = timestamp => (
        <View style={styles.container_date}>
            <Icon
                name={'calendar-outline'}
                type="ionicon"
                color={Colors.black_09}
                style={styles.iconDate}
            />
            <CustomizedText type="light_content">{formatBasicDate(timestamp)}</CustomizedText>
        </View>
    );

    const _renderTag = () => <View style={styles.tag(theme)} />;

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7}>
            {_renderHeader()}
            {_renderContent(hostName)}
            {_renderLine()}
            {_renderContent(address)}
            {_renderDate(startDate)}
            {_renderDate(endDate)}
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
        marginTop: DefaultSize.S,
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
