import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import useHomeScreen from './useHomeScreen';
import { CustomizedText, CustomizedContainer, CustomizedInput } from '@components';
import { DefaultSize } from '@utils/Constants';
import FindQueueScreen from '@screens/MainAppStack/findqueue';
import { Icon } from 'react-native-elements';

const HomeScreen = props => {
    const { isSearching, refInputSearch, startSearching, stopSearching, onPressQr } =
        useHomeScreen(props);

    const _renderSearchComponent = () =>
        isSearching ? (
            <View style={styles.search_view}>
                <FindQueueScreen requestClose={stopSearching} />
            </View>
        ) : null;

    const _renderForeground = () => (
        <CustomizedContainer type={'foreground'} containerStyle={styles.foreground} angle={180} />
    );

    const _renderMain = () => (
        <SafeAreaView style={styles.main}>
            <CustomizedText type={'header'}>onLineUp</CustomizedText>
            <View style={styles.row_search}>
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
                    color={'black'}
                    style={styles.icon_qr}
                />
            </View>
        </SafeAreaView>
    );

    return (
        <View style={styles.container}>
            {_renderForeground()}
            {_renderMain()}
            {_renderSearchComponent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: DefaultSize.L,
        paddingHorizontal: DefaultSize.L,
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
});

export default HomeScreen;
