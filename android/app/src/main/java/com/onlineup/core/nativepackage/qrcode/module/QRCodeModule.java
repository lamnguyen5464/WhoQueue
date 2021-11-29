package com.onlineup.core.nativepackage.qrcode.module;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.onlineup.core.nativepackage.qrcode.helper.QRCodeCallbackManager;
import com.onlineup.core.nativepackage.qrcode.view.scanner.QRCodeScannerActivity;

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

    @ReactMethod
    public void startScanning(Promise promise){
        QRCodeCallbackManager.setScanningPromise(promise);
        getCurrentActivity().startActivity(new Intent(getCurrentActivity(), QRCodeScannerActivity.class));
    }
}
