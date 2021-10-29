package com.onlineup.core.service;

import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.onlineup.utility.NotificationUtils;

public class MessagingService extends FirebaseMessagingService {
    private static final String TAG = "MyFirebaseService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // handle a notification payload.
        if (remoteMessage.getNotification() != null) {
            Log.d("@@ ", "Message Notification Body: " + remoteMessage.getNotification().getBody());

            NotificationUtils.sendNotification(this, remoteMessage.getNotification().getBody());
        }
    }

    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        Log.d("@@@", "token" + token);
        sendRegistrationToServer(token);
    }

    private void sendRegistrationToServer(String token) {
        // TODO: Implement this method to send token to your app server.
    }
}
