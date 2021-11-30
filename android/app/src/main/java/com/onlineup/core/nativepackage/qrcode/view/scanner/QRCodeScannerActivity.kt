package com.onlineup.core.nativepackage.qrcode.view.scanner

import android.os.Bundle
import android.util.DisplayMetrics
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import com.onlineup.R
import com.onlineup.core.nativepackage.qrcode.helper.QRCodeCallbackManager
import kotlinx.android.synthetic.main.qrcode_scanner_view.*


class QRCodeScannerActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.qrcode_scanner_view)

        drawSquareFrame()

        val qrCodeCamera = QRCodeCamera(
                ProcessCameraProvider.getInstance(this),
                findViewById<PreviewView>(R.id.camera_view),
                ContextCompat.getMainExecutor(this),
        ) { rawValue ->
            QRCodeCallbackManager.onScanningResult(rawValue)
            finish()
        }

        qrCodeCamera.start(this)

        findViewById<ImageView>(R.id.bt_back).setOnClickListener {
            QRCodeCallbackManager.onScanningResult(null)
            finish()
        }
    }

    private fun drawSquareFrame() {
        val metrics: DisplayMetrics? = resources?.displayMetrics
        val SCREEN_WIDTH = metrics?.widthPixels ?: 0
        val SCREEN_HEIGHT = metrics?.heightPixels ?: 0

        val PADDDING = SCREEN_WIDTH * 1 / 5
        val EDGE_LENGTH = SCREEN_WIDTH - 2 * PADDDING


        val backgroundLayout: RelativeLayout = findViewById(R.id.camera_layout)


//        container_text
        var layout = RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT, RelativeLayout.LayoutParams.WRAP_CONTENT)
        layout.setMargins(0, EDGE_LENGTH / 2, 0, 0)
        layout.addRule(RelativeLayout.CENTER_HORIZONTAL)
        findViewById<RelativeLayout>(R.id.container_text).layoutParams = layout

        findViewById<TextView>(R.id.text_desc).text = intent?.extras?.get("desc")?.toString() ?: ""

        var view = View(this)
        layout = RelativeLayout.LayoutParams(PADDDING, SCREEN_HEIGHT)
        layout.addRule(RelativeLayout.ALIGN_PARENT_RIGHT)
        view.layoutParams = layout
        view.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(view)

        view = View(this)
        layout = RelativeLayout.LayoutParams(PADDDING, SCREEN_HEIGHT)
        layout.addRule(RelativeLayout.ALIGN_PARENT_LEFT)
        view.layoutParams = layout
        view.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(view)

        view = View(this)
        layout = RelativeLayout.LayoutParams(EDGE_LENGTH, EDGE_LENGTH)
        layout.addRule(RelativeLayout.CENTER_HORIZONTAL)
        view.layoutParams = layout
        view.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(view)

        view = View(this)
        layout = RelativeLayout.LayoutParams(EDGE_LENGTH, SCREEN_HEIGHT)
        layout.setMargins(0, EDGE_LENGTH * 2, 0, 0)
        layout.addRule(RelativeLayout.CENTER_HORIZONTAL)
        view.layoutParams = layout
        view.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(view)

    }
}