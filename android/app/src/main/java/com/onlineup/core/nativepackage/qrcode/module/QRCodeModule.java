package com.onlineup.core.nativepackage.qrcode.module;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class QRCodeModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "QRCodeModule";

    public QRCodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }
}
