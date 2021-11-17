import React, { useRef } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import useFindQueueScreen from './useFindQueueScreen';
import { CustomizedText, CustomizedContainer } from '@components';
import { DefaultSize } from '@utils/Constants';
import CustomizedInput from '@components/CustomizedInput';

const FindQueueScreen = props => {
    const { animatedValue, onPressClose, inputSearchRef, headerHeight } = useFindQueueScreen(props);

    const { posYTabSearch } = props;

    const inputTransformation = {
        transform: [
            {
                translateY: animatedValue?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [posYTabSearch || 0, 0],
                }),
            },
        ],
    };

    const _renderInputHeader = () => (
        <Animated.View style={[styles.container_header(headerHeight), inputTransformation]}>
            <View style={styles.header}>
                <CustomizedInput
                    ref={inputSearchRef}
                    icon={'search'}
                    containerStyle={styles.search_bar}
                    onFocus={() => {}}
                    placeholder={'Search your queue here'}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={onPressClose}>
                    <CustomizedText type={'simple'}>Close</CustomizedText>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    const _renderResultView = () => (
        <Animated.View style={[styles.result_view]} opacity={animatedValue}>
            <CustomizedText>loading...</CustomizedText>
        </Animated.View>
    );

    return (
        <View style={[styles.container]}>
            {_renderResultView()}
            {_renderInputHeader()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    result_view: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    container_header: headerHeight => ({
        position: 'absolute',
        height: headerHeight,
        width: '100%',
        paddingHorizontal: DefaultSize.XL,
        justifyContent: 'flex-end',
    }),
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    search_bar: {
        width: '85%',
    },
});

export default FindQueueScreen;
