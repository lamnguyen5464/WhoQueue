package com.onlineup.core.nativepackage.qrcode.view.scanner

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import com.onlineup.R
import com.onlineup.core.nativepackage.qrcode.helper.QRCodeCallbackManager


class QRCodeScannerActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.qrcode_scanner_view)

        val qrCodeCamera = QRCodeCamera(
                ProcessCameraProvider.getInstance(this),
                findViewById<PreviewView>(R.id.camera_view),
                ContextCompat.getMainExecutor(this),
        ) { rawValue ->
            Log.d("@@@ rawvalue", rawValue)
            QRCodeCallbackManager.onScanningResult(rawValue)
            finish()
        }

        qrCodeCamera.start(this)
    }
}