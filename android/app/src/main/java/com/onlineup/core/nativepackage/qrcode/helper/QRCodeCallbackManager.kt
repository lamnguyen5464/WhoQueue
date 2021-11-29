package com.onlineup.core.nativepackage.qrcode.helper

import com.facebook.react.bridge.Promise

object QRCodeCallbackManager {
    private var scanningPromiseInstance: Promise? = null

    @JvmStatic
    fun setScanningPromise(_promise: Promise) {
        scanningPromiseInstance = _promise
    }

    @JvmStatic
    fun onScanningResult(result: Any) {
        scanningPromiseInstance?.resolve(result)
        scanningPromiseInstance = null
    }

}