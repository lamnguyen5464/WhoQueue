import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import useHomeScreen from './useHomeScreen';
import { CustomizedText, CustomizedContainer, CustomizedInput } from '@components';
import { DefaultSize } from '@utils/Constants';
import FindQueueScreen from '@screens/MainAppStack/findqueue';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = props => {
    const { isSearching, startSearching, stopSearching } = useHomeScreen(props);

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
            <TouchableOpacity onPress={startSearching}>
                <CustomizedText type={'header'}>onLineUp</CustomizedText>
            </TouchableOpacity>
            <CustomizedInput
                icon={'search'}
                containerStyle={styles.search_bar}
                // onFocus={startSearching}
                placeholder={'Search your queue here'}
            />
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
    foreground: {},
    main: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        paddingTop: DefaultSize.L,
        paddingHorizontal: DefaultSize.L,
    },
    search_bar: {
        marginTop: DefaultSize.XL,
    },
    search_view: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
});

export default HomeScreen;
