import React, { useRef } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import useHomeScreen from './useHomeScreen';
import { CustomizedText, CustomizedContainer, CustomizedInput, QueueItem } from '@components';
import { DefaultSize } from '@utils/Constants';
import FindQueueScreen from '@screens/MainAppStack/findqueue';
import { Icon } from 'react-native-elements';
import Colors from '@utils/Colors';
import { useHeaderHeight } from '@react-navigation/stack';

const HomeScreen = props => {
    const { joinedQueue, isSearching, refInputSearch, startSearching, stopSearching, onPressQr } =
        useHomeScreen(props);

    const posYTabSearch = useRef();
    const headerHeight = useRef(useHeaderHeight()).current;

    const _renderSearchComponent = () =>
        isSearching ? (
            <View style={styles.search_view}>
                <FindQueueScreen
                    requestClose={stopSearching}
                    posYTabSearch={posYTabSearch.current}
                    headerHeight={headerHeight}
                />
            </View>
        ) : null;

    const _renderForeground = () => (
        <CustomizedContainer type={'foreground'} containerStyle={styles.foreground} angle={180} />
    );

    const _renderMain = () => (
        <SafeAreaView>
            <View style={styles.main}>
                {_renderHeader()}
                {_renderSearchBar()}
                {_renderJoinedList()}
            </View>
        </SafeAreaView>
    );

    const _renderHeader = () => (
        <>
            <CustomizedText type={'header'}>onLineUp</CustomizedText>
            <CustomizedText type={'content_header'}>onLineUp</CustomizedText>
        </>
    );

    const _renderSearchBar = () => (
        <View
            style={styles.row_search}
            onLayout={event => {
                posYTabSearch.current =
                    event?.nativeEvent?.layout?.y + event?.nativeEvent?.layout?.height;
            }}
        >
            <CustomizedInput
                ref={refInputSearch}
                icon={'search'}
                containerStyle={styles.search_bar}
                onFocus={startSearching}
                placeholder={'Search your queue here'}
            />
            <Icon
                onPress={onPressQr}
                name={'qr-code'}
                type="ionicon"
                color={Colors.primary_1}
                style={styles.icon_qr}
            />
        </View>
    );

    const _renderJoinedList = () => (
        <View style={styles.container_list}>
            <FlatList
                keyExtractor={({ _, index }) => `list_joined_at_home_${index}`}
                data={joinedQueue || []}
                renderItem={({ item, index }) => <QueueItem data={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* {_renderForeground()} */}
            {_renderMain()}
            {_renderSearchComponent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.black_05,
        flex: 1,
    },
    row_search: {
        marginTop: DefaultSize.XL,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    foreground: {},
    main: {
        width: '100%',
        height: '100%',
        paddingTop: DefaultSize.L,
        paddingHorizontal: DefaultSize.XL,
    },
    search_bar: {
        width: '85%',
    },
    search_view: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    icon_qr: {},
    container_list: {
        marginTop: DefaultSize.M,
    },
});

export default HomeScreen;
