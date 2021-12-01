import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import useMainScreen from './useMainScreen';
import { CustomizedButton } from '@components';
import { DefaultSize } from '@utils/Constants';
import HomeScreen from '@screens/MainAppStack/home';
import { Icon } from 'react-native-elements';
import Colors from '@utils/Colors';
import SharedStyles from '@utils/SharedStyles';
import DeviceConfigs from '@utils/DeviceConfigs';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const MainScreen = props => {
    const { navigation, onPressCreate } = useMainScreen(props);
    const refTab = useRef();

    const _renderButtonCreate = () => {
        return (
            <CustomizedButton
                containerStyle={styles.bt_create}
                onPress={onPressCreate}
                type={'primary'}
            >
                + Create queue
            </CustomizedButton>
        );
    };

    const _renderTabBar = ({ goToPage, tabs, activeTab }) => {
        return (
            <View style={styles.tabbar}>
                {tabs.map((item, index) => {
                    return (
                        <Icon
                            key={`icon_tabbar_${item}`}
                            onPress={() => {
                                goToPage(index);
                            }}
                            name={`${item}${index !== activeTab ? '-outline' : ''}`}
                            type="ionicon"
                            color={Colors.primary_1}
                        />
                    );
                })}
                {_renderButtonCreate()}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollableTabView
                ref={refTab}
                tabBarPosition="bottom"
                renderTabBar={_renderTabBar}
                initialPage={0}
            >
                <HomeScreen tabLabel="home" key={`tab_view_00`} navigation={navigation} />
                <HomeScreen tabLabel="reader" key={`tab_view_01`} navigation={navigation} />
            </ScrollableTabView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.black_05,
        flex: 1,
    },
    tabbar: {
        ...SharedStyles.shadow,
        flexDirection: 'row',
        paddingBottom: DefaultSize.S + (DeviceConfigs.isIphoneX() ? DefaultSize.L : 0),
        paddingTop: DefaultSize.S,
        paddingHorizontal: DefaultSize.XL,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bt_create: {
        width: '50%',
    },
    icon: {
        width: DefaultSize.XL,
        height: DefaultSize.XL,
    },
});

export default MainScreen;
