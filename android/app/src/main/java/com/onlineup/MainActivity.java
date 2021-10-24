package com.onlineup;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.onlineup.nativemodule.FacebookSDKModule;

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

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        //for facebook sdk
        if (FacebookSDKModule.fbCallbackManager != null) {
            FacebookSDKModule.fbCallbackManager.onActivityResult(requestCode, resultCode, data);
        }
    }
}
