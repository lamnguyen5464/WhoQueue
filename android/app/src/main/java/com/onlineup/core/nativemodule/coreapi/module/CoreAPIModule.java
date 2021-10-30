package com.onlineup.core.nativemodule.coreapi.module;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.onlineup.core.nativemodule.coreapi.constant.KeyEmitter;
import com.onlineup.utility.StorageUtils;

import java.util.HashMap;
import java.util.Map;

public class CoreAPIModule extends ReactContextBaseJavaModule {
    public static String MODULE_NAME = "CoreAPIModule";
    private static ReactApplicationContext reactContext;

    public CoreAPIModule(@Nullable ReactApplicationContext _reactContext) {
        super(_reactContext);
        reactContext = _reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return KeyEmitter.getAllKeys();
    }

    public static void emitEvent(String eventName, @Nullable WritableMap eventData) {
        if (eventData != null) eventData.putString("eventName", eventName);


        if (reactContext != null
                && reactContext.hasActiveCatalystInstance()
                && reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class) != null
        ) {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, eventData);
        }
    }

    @ReactMethod
    public void setStorage(String key, String value, Promise promise) {
        try {
            StorageUtils.setString(reactContext, key, value);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getStorage(String key, Promise promise) {
        try {
            String value = StorageUtils.getString(reactContext, key);
            promise.resolve(value);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

}
