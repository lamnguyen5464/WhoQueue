package com.onlineup.core.service;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.onlineup.core.notification.AppNotification;
import com.onlineup.utility.StorageUtils;

public class MessagingService extends FirebaseMessagingService {
    public static String FCM_TOKEN_KEY = "FCM_TOKEN_KEY";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        AppNotification.pushNotification(this, remoteMessage);
    }

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        saveFcmToken(token);
    }

    private void saveFcmToken(String token) {
        StorageUtils.setString(getApplicationContext(), FCM_TOKEN_KEY, token);
    }
}
