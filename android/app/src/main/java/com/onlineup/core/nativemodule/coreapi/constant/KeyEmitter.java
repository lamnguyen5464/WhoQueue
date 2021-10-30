package com.onlineup.core.nativemodule.coreapi.constant;

import java.util.HashMap;
import java.util.Map;

public class KeyEmitter {
    public static String NATIVE_RESPONSE_EMITTER = "NATIVE_RESPONSE_EMITTER";
    public static String FCM_TOKEN_EMITTER = "FCM_TOKEN_EMITTER";

    public static Map<String, Object> getAllKeys(){
        Map<String,Object> map = new HashMap<>();
        map.put(FCM_TOKEN_EMITTER, FCM_TOKEN_EMITTER);
        map.put(NATIVE_RESPONSE_EMITTER, NATIVE_RESPONSE_EMITTER);

        return map;
    }

}
