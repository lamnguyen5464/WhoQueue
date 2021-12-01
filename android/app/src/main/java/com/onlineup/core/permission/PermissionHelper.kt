package com.onlineup.core.permission

import android.Manifest
import android.app.Activity
import android.content.Context
import android.os.Build
import android.content.pm.PackageManager
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.bridge.ReactApplicationContext
import android.content.Intent
import android.net.Uri
import android.os.Process
import android.provider.Settings
import java.lang.Exception

object PermissionHelper {
    @JvmStatic
    fun checkPermission(activity: Activity, permission: String?): String {
        if (!isSupportedPermission(permission)) {
            return PermissionConstants.UNAVAILABLE
        }
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return if (activity.applicationContext.checkPermission(
                    permission!!,
                    Process.myPid(),
                    Process.myUid()
                )
                == PackageManager.PERMISSION_GRANTED
            ) PermissionConstants.GRANTED else PermissionConstants.BLOCKED
        }
        return if (activity.applicationContext.checkSelfPermission(permission!!) == PackageManager.PERMISSION_GRANTED) {
            PermissionConstants.GRANTED
        } else {
            PermissionConstants.DENIED
        }
    }

    @JvmStatic
    fun checkPermission(activity: Activity, permission: String?, promise: Promise) {
        promise.resolve(checkPermission(activity, permission))
    }

    @JvmStatic
    fun isGranted(activity: Activity, permission: String?): Boolean {
        return checkPermission(activity, permission) == PermissionConstants.GRANTED
    }

    @JvmStatic
    fun requestPermission(activity: Activity?, permission: String?, promise: Promise) {
        if (activity == null || !isSupportedPermission(permission)) {
            promise.resolve(PermissionConstants.UNAVAILABLE)
            return
        }
        val permissionAwareActivity = activity as PermissionAwareActivity
        if (permissionAwareActivity.shouldShowRequestPermissionRationale(permission)) {
            //when user clicked "do not show again"
            activity.applicationContext?.let { this.openSettings(it) }
            promise.resolve(PermissionConstants.BLOCKED)
            return
        }
        permissionAwareActivity.requestPermissions(
            arrayOf(permission),
            1
        ) { _, _, grantResults ->
            val result = if (grantResults.isNotEmpty()) grantResults[0] else -1
            promise.resolve(getOnResultStatus(result))
            false
        }
    }

    @JvmStatic
    fun openSettings(context: Context) {
        try {
            val intent = Intent()
            val packageName = context.packageName
            intent.action = Settings.ACTION_APPLICATION_DETAILS_SETTINGS
            intent.data = Uri.fromParts("package", packageName, null)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            context.startActivity(intent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @JvmStatic
    fun getOnResultStatus(result: Int): String {
        return when (result) {
            PackageManager.PERMISSION_GRANTED -> PermissionConstants.GRANTED
            PackageManager.PERMISSION_DENIED -> PermissionConstants.DENIED
            else -> PermissionConstants.UNAVAILABLE
        }
    }

    @JvmStatic
    fun isSupportedPermission(permission: String?): Boolean {
        return when (permission) {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.CAMERA ->
                true
            else -> false
        }
    }
}