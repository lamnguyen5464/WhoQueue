package com.onlineup.core.notification;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;

import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.RemoteMessage;
import com.onlineup.MainActivity;
import com.onlineup.R;
import com.onlineup.utility.JSONSafeObject;

public class ConfigNotification {
    private JSONSafeObject extra;
    private String title;
    private String content;
    private String channelId;
    NotificationCompat.Builder notificationBuilder;

    ConfigNotification(Context context, RemoteMessage messageData) {
        this.initBaseConfigs(context, messageData);

        PendingIntent notificationPendingIntent = getPendingIntent(context, this.extra.toString());

        this.notificationBuilder = new NotificationCompat.Builder(context, channelId)
                .setAutoCancel(true)
                .setContentTitle(this.title)
                .setContentText(this.content)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setDefaults(Notification.DEFAULT_ALL)
                .setContentIntent(notificationPendingIntent)
                .setPriority(NotificationManager.IMPORTANCE_HIGH)
                .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), R.mipmap.ic_launcher));


        if (!this.extra.getStringSafely(KeyNotification.cta).isEmpty()) {
            this.addCta(context, this.extra.getStringSafely(KeyNotification.cta));
        }
    }

    private void addCta(Context context, String configCTA) {
        JSONSafeObject config = JSONSafeObject.parseSafe(configCTA);
        if (config.getStringSafely(KeyNotification.text).isEmpty()) {
            return;
        }
        this.notificationBuilder.addAction(
                new NotificationCompat.Action(
                        null,
                        config.getStringSafely(KeyNotification.text),
                        getPendingIntent(context, configCTA)
                )
        );
    }

    public Notification build() {
        return this.notificationBuilder.build();
    }

    public String getChannelId() {
        return this.channelId;
    }

    public String getTitle() {
        return this.title;
    }

    private void initBaseConfigs(Context context, RemoteMessage messageData) {
        this.title = (messageData.getNotification().getTitle());
        this.content = messageData.getNotification().getBody();

        this.extra = JSONSafeObject.parseSafe(messageData.getData().get(KeyNotification.extra));
        this.channelId = context.getString(R.string.app_name);
    }

    private PendingIntent getPendingIntent(Context context, String dataIntent) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.putExtra(KeyNotification.extra, dataIntent);    //add extra message
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_ONE_SHOT);
        return pendingIntent;
    }
}
