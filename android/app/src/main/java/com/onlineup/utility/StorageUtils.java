package com.onlineup.utility;

import android.content.Context;
import android.content.SharedPreferences;


public class StorageUtils {
    private static String SHARED_STORAGE = "SHARED_STORAGE";

    public static void setString(Context context, String key, String value) {
        if (context == null || value == null) {
            return;
        }
        SharedPreferences sharedPreferences = context.getSharedPreferences(SHARED_STORAGE, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(key, value);
        editor.apply();
    }

    public static String getString(Context context, String key) {
        if (context == null) {
            return null;
        }
        SharedPreferences sharedPreferences = context.getSharedPreferences(SHARED_STORAGE, Context.MODE_PRIVATE);
        String value = sharedPreferences.getString(key, "");
        return value;
    }
}
