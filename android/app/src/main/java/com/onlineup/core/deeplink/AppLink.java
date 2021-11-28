package com.onlineup.core.deeplink;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.onlineup.core.nativepackage.coreapi.constant.KeyCommonNative;
import com.onlineup.core.storage.StorageInstance;
import com.onlineup.utility.JSONSafeObject;

public class AppLink {

    public static void handleDeepLink(Intent appLinkIntent) {
        String deepLink = appLinkIntent.getDataString();
        if (deepLink == null) {
            return;
        }
        Uri uri = Uri.parse(deepLink);

        JSONSafeObject dataParams = new JSONSafeObject();
        for (Object param : uri.getQueryParameterNames().toArray()) {
            String key = param.toString();
            dataParams.putStringSafely(key, uri.getQueryParameter(key));
        }
        Log.d("@@@ [Deeplink data]", dataParams.toString());

        StorageInstance.setOneShotStorage(KeyCommonNative.DATA_FROM_DEEPLINK, dataParams.toString());
    }
}
