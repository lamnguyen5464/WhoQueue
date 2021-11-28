package com.onlineup.core.nativepackage.facebook;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.Arrays;

public class FacebookSDKModule extends ReactContextBaseJavaModule {

    public static String MODULE_NAME = "FacebookSDKModule";

    public static CallbackManager fbCallbackManager;

    public FacebookSDKModule(ReactApplicationContext reactContext) {
        super(reactContext);
        if (fbCallbackManager == null) {
            fbCallbackManager = CallbackManager.Factory.create();
        }
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void getToken(Promise promise) {
        WritableMap response = Arguments.createMap();
        AccessToken token = AccessToken.getCurrentAccessToken();
        if (token != null) {
            response.putString("token", token.getToken());
            promise.resolve(response);
        } else {
            this.login(promise);
        }

    }

    @ReactMethod
    public void login(Promise promise) {
        LoginManager.getInstance().logInWithReadPermissions(getCurrentActivity(), Arrays.asList("public_profile", "email"));
        LoginManager.getInstance().registerCallback(fbCallbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                LoginManager.getInstance().registerCallback(fbCallbackManager, null);

                WritableMap res =  Arguments.createMap();
                res.putString("token", loginResult.getAccessToken().getToken());
                promise.resolve(res);
            }

            @Override
            public void onCancel() {
                LoginManager.getInstance().registerCallback(fbCallbackManager, null);
                Log.d("@@@", "Cancel");
                promise.reject("onCancel", "");
            }

            @Override
            public void onError(@NonNull FacebookException e) {
                LoginManager.getInstance().registerCallback(fbCallbackManager, null);
                Log.d("@@@", e.toString());
                promise.reject(e);
            }
        });
    }
}
