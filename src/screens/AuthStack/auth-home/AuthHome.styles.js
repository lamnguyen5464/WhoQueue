import { StyleSheet, StatusBar } from 'react-native';
import { DefaultSize } from '@utils/Constants';
import Colors from '@utils/Colors';
import DeviceConfigs from '@utils/DeviceConfigs';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black_05,
    },
    foreground: {
        height: '50%',
        borderBottomLeftRadius: DefaultSize.XL,
        borderBottomRightRadius: DefaultSize.XL,
    },
    pos_overlay: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    bt_sign_in: {
        marginTop: DefaultSize.XL,
    },
    bt_sign_up: {
        marginTop: DefaultSize.S,
    },
    container_locale: {
        flexDirection: 'row',
        position: 'absolute',
        top: (DeviceConfigs.isIphoneX() ? DefaultSize.XL * 1.5 : 0) + DefaultSize.M,
        right: DefaultSize.M,
        backgroundColor: Colors.white,
        borderRadius: DefaultSize.S,
        borderColor: Colors.primary_1,
        borderWidth: DefaultSize.XXS / 2,
        padding: DefaultSize.XXS,
        width: 70,
    },
    locale_active: {
        width: '50%',
        borderRadius: DefaultSize.S,
        backgroundColor: Colors.primary_1,
    },
    locale_inactive: {
        width: '50%',
        backgroundColor: Colors.red,
    },
    text_locale_active: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text_locale_inactive: {
        color: Colors.primary_1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;
