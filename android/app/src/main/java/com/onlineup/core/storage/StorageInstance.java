package com.onlineup.core.storage;

import android.content.Context;
import android.content.SharedPreferences;

import java.util.HashMap;
import java.util.Map;


public class StorageInstance {
    private static String SHARED_STORAGE = "SHARED_STORAGE";
    private static Map<String, String> oneShotInstance = new HashMap<>();

    public static void setOneShotStorage(String key, String value){
        oneShotInstance.put(key, value);
    }

    public static String getOneSotStorage(String key){
       return oneShotInstance.remove(key);
    }

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
