package com.onlineup;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.onlineup.core.deeplink.AppLink;
import com.onlineup.core.nativemodule.facebook.FacebookSDKModule;
import com.onlineup.core.notification.AppNotification;

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

        handleExternalFlow(getIntent());
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //for facebook sdk
        if (FacebookSDKModule.fbCallbackManager != null) {
            FacebookSDKModule.fbCallbackManager.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleExternalFlow(intent);
    }

    private void handleExternalFlow(Intent intent) {
        //handle data external passed-in data
        AppNotification.handleClickNotification(intent);
        AppLink.handleDeepLink(intent);
    }


}
