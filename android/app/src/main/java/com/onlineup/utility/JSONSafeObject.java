package com.onlineup.utility;

import androidx.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

public class JSONSafeObject extends JSONObject {

    private JSONSafeObject(@NonNull String json) throws JSONException {
        super(json);
    }

    public static JSONSafeObject parseSafe(String str) {
        try {
            return new JSONSafeObject(str);
        } catch (JSONException e) {
            e.printStackTrace();
            return new JSONSafeObject();
        }
    }

    public JSONSafeObject() {
        super();
    }

    public String getStringSafely(String field) {
        String value = "";
        if (this.has(field)) {
            try {
                value = this.getString(field);
            } catch (JSONException e) {
                e.printStackTrace();
                return "";
            }
        }
        return value;
    }

    public void putStringSafely(String field, String value) {
        try {
            this.put(field, value);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public Object getSafely(String field){
        if (this.has(field)) {
            try {
                return this.getString(field);
            } catch (JSONException e) {
                e.printStackTrace();
                return null;
            }
        }
        return null;
    }

    public void putSafely(String field, Object value){
        try {
            this.put(field, value);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
}
