import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SharedStyles from '@utils/SharedStyles';
import { DefaultSize, TextSize } from '@utils/Constants';
import { CustomizedText } from '.';
import Colors from '@utils/Colors';
import { Icon } from 'react-native-elements';

const QueueItem = (data = {}) => {
    const _renderLine = () => <View style={styles.line} />;

    const _renderHeader = () => (
        <CustomizedText type="title_dark" textStyle={styles.title}>
            Room name
        </CustomizedText>
    );

    const _renderContent = () => (
        <CustomizedText type="light_content">Thong tin gi do</CustomizedText>
    );

    const _renderDate = isStartDate => (
        <View style={styles.container_date}>
            <Icon
                name={'calendar-outline'}
                type="ionicon"
                color={isStartDate ? Colors.black_09 : Colors.black_20}
                style={styles.iconDate}
            />
            <CustomizedText type="light_content">{`${new Date(
                '2015-03-25T12:00:00Z'
            )}`}</CustomizedText>
        </View>
    );

    const _renderTag = () => <View style={styles.tag()} />;

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7}>
            {_renderHeader()}
            {_renderContent()}
            {_renderLine()}
            {_renderDate(true)}
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
    iconDate: {},
    container_date: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tag: (theme = Colors.primary_1) => ({
        position: 'absolute',
        backgroundColor: theme,
        top: 0,
        right: '0%',
        width: '30%',
        height: DefaultSize.S,
        borderRadius: DefaultSize.S,
    }),
});

export default memo(QueueItem);
