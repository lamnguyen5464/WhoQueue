package com.onlineup.core.notification;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.google.firebase.messaging.RemoteMessage;
import com.onlineup.core.nativemodule.coreapi.constant.KeyEmitter;
import com.onlineup.core.nativemodule.coreapi.module.CoreAPIModule;

public class AppNotification {

    public static void handleClickNotification(Intent intent) {
        Log.d("@@@ [Noti data]", intent.getStringExtra(KeyNotification.extra) + "");
        String data = intent.getStringExtra(KeyNotification.extra);

        if (data != null && !data.isEmpty()) {
            WritableMap response = Arguments.createMap();
            response.putString("data", data.isEmpty() ? "{}" : data);
            CoreAPIModule.emitEvent(KeyEmitter.NOTIFICATION_EMITTER, response);
        }
    }

    public static void pushNotification(Context context, RemoteMessage messageData) {
        ConfigNotification configNotification = new ConfigNotification(context, messageData);
        startNotifying(context, configNotification);
    }

    private static void startNotifying(Context context, ConfigNotification configNotification) {
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        // Since android Oreo notification channel is needed.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    configNotification.getChannelId(),
                    configNotification.getTitle(),
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            notificationManager.createNotificationChannel(channel);
        }
        notificationManager.notify(0, configNotification.build());
    }
}
