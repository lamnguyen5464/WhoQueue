import { StyleSheet } from 'react-native';
import Colors from '@utils/Colors';
import { DefaultSize } from '@utils/Constants';

export default StyleSheet.create({
    shadow: {
        shadowColor: Colors.dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: DefaultSize.XXS,
        shadowOpacity: 0.3,
        elevation: 2,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    center_horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    full_white: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    bar: {
        width: '100%',
        height: 'auto',
        borderRadius: DefaultSize.S,
        paddingVertical: DefaultSize.S,
        paddingHorizontal: DefaultSize.L,
        borderRadius: DefaultSize.S,
    },
});
