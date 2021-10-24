import { StyleSheet } from 'react-native';
import { DefaultSize, TextSize } from '@utils/Constants';
import Colors from '@utils/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black_05,
    },
    foreground: {
        height: '45%',
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
    pos_title: {
        position: 'absolute',
        width: '90%',
        alignSelf: 'center',
        marginTop: DefaultSize.XL,
    },
    cta_confirm: {
        marginTop: DefaultSize.M,
    },
    text_or: {
        marginVertical: DefaultSize.M,
        fontWeight: 'bold',
    },
    container_OTP: {
        marginTop: DefaultSize.M,
    },
    icon_social: {
        borderRadius: DefaultSize.XS,
        height: DefaultSize.XL * 1.7,
        width: DefaultSize.XL * 1.7,
    },
    text_resend: {
        marginTop: DefaultSize.M,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    container_social: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: DefaultSize.XS,
    },
});

export default styles;
