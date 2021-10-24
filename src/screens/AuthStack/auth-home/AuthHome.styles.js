import { StyleSheet } from 'react-native';
import { DefaultSize } from '@utils/Constants';
import Colors from '@utils/Colors';

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
        top: DefaultSize.M,
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
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    locale_inactive: {
        width: '50%',
        flex: 1,
        backgroundColor: Colors.red,
        color: Colors.primary_1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;
