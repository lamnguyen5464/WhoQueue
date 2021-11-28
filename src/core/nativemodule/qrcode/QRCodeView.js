import { View, Platform, requireNativeComponent } from 'react-native';

export default Platform.OS === 'ios' ? View : (QRCodeView = requireNativeComponent('QRCodeView'));
