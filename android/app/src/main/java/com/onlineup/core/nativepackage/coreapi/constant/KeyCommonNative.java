package com.onlineup.core.nativepackage.coreapi.constant;

import java.util.HashMap;
import java.util.Map;

public class KeyCommonNative {
    public static String COMMON_NATIVE_EMITTING = "COMMON_NATIVE_EMITTING";

    // oneShotStorage keys
    public static String DATA_FROM_NOTIFICATION = "DATA_FROM_NOTIFICATION";
    public static String DATA_FROM_DEEPLINK = "DATA_FROM_DEEPLINK";

    public static Map<String, Object> getAllKeys() {
        Map<String, Object> map = new HashMap<>();
        map.put(COMMON_NATIVE_EMITTING, COMMON_NATIVE_EMITTING);
        map.put(DATA_FROM_NOTIFICATION, DATA_FROM_NOTIFICATION);
        map.put(DATA_FROM_DEEPLINK, DATA_FROM_DEEPLINK);

        return map;
    }

}
