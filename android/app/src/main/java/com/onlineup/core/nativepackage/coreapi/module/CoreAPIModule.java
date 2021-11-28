package com.onlineup.core.nativepackage.coreapi.module;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.onlineup.core.nativepackage.coreapi.constant.KeyCommonNative;
import com.onlineup.core.storage.StorageInstance;

import java.util.Map;

public class CoreAPIModule extends ReactContextBaseJavaModule {
    public static String MODULE_NAME = "CoreAPIModule";

    public CoreAPIModule(@Nullable ReactApplicationContext _reactContext) {
        super(_reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return KeyCommonNative.getAllKeys();
    }

    public static void emitEvent(ReactContext reactContext, String eventName, @Nullable WritableMap eventData) {
        if (reactContext != null
                && reactContext.hasActiveCatalystInstance()
                && reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class) != null
        ) {
            WritableMap response = Arguments.createMap();
            response.putString("eventName", eventName);
            response.putMap("data", eventData);

            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(KeyCommonNative.COMMON_NATIVE_EMITTING, response);
        }
    }

    @ReactMethod
    public void setOneShotStorage(String key, String value) {
        StorageInstance.setOneShotStorage(key, value);
    }

    @ReactMethod
    public void getOneShotStorage(String key, Promise promise) {
        promise.resolve(StorageInstance.getOneSotStorage(key));
    }

    @ReactMethod
    public void setStorage(String key, String value, Promise promise) {
        try {
            ReactApplicationContext reactContext = getReactApplicationContext();
            if (reactContext == null) {
                promise.reject(new RuntimeException());
            }
            StorageInstance.setString(reactContext, key, value);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getStorage(String key, Promise promise) {
        try {
            ReactApplicationContext reactContext = getReactApplicationContext();
            if (reactContext == null) {
                promise.reject(new RuntimeException());
            }
            String value = StorageInstance.getString(getReactApplicationContext(), key);
            promise.resolve(value);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

}
