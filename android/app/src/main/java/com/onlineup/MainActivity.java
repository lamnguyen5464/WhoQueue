package com.onlineup;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.react.ReactActivity;

import java.util.Arrays;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "onLineUp";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.d("@@@ ", "haehaesfwer");


        LoginManager.getInstance().registerCallback(mCallbackManager, null);

        LoginManager.getInstance().logInWithReadPermissions(MainActivity.this, Arrays.asList("public_profile", "email"));

        LoginManager.getInstance().registerCallback(mCallbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Log.d("@@@ token", loginResult.getAccessToken().getToken());
                Log.d("@@@ exp", loginResult.getAccessToken().getExpires().toString());
            }

            @Override
            public void onCancel() {
                Log.d("@@@", "Cancel");
            }

            @Override
            public void onError(@NonNull FacebookException e) {
                Log.d("@@@", e.toString());
            }
        });
    }

    CallbackManager mCallbackManager = CallbackManager.Factory.create();

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }
}
