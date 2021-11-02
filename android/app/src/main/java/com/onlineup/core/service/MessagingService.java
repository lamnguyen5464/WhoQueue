package com.onlineup.core.service;

import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.onlineup.utility.NotificationUtils;
import com.onlineup.utility.StorageUtils;

public class MessagingService extends FirebaseMessagingService {
    public static String FCM_TOKEN_KEY = "FCM_TOKEN_KEY";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        if (remoteMessage.getNotification() != null) {
            Log.d("@@ ", "Message Notification Body: " + remoteMessage.getNotification().toString());

            NotificationUtils.sendNotification(this, remoteMessage.getNotification().getBody());
        }
    }

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        onReceiveNewToken(token);
    }

    private void onReceiveNewToken(String token) {
//        WritableMap map = Arguments.createMap();
//        map.putString("fcmToken",token);
//        CoreAPIModule.emitEvent(KeyEmitter.FCM_TOKEN_EMITTER, map);
        StorageUtils.setString(getApplicationContext(), "FCM_TOKEN_KEY", token);
    }
}
