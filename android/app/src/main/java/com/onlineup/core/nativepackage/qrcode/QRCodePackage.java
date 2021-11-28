package com.onlineup.core.nativepackage.qrcode;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.onlineup.core.nativepackage.qrcode.module.QRCodeModule;
import com.onlineup.core.nativepackage.qrcode.view.QRCodeViewManager;

import java.util.Arrays;
import java.util.List;

public class QRCodePackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        return Arrays.asList(new QRCodeModule(reactContext));
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Arrays.asList(new QRCodeViewManager());
    }
}
