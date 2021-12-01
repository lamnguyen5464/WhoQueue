package com.onlineup.core.nativepackage.qrcode.view.scanner

import android.os.Bundle
import android.util.DisplayMetrics
import android.view.View
import android.widget.ImageView
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import com.onlineup.R
import com.onlineup.core.nativepackage.qrcode.helper.QRCodeCallbackManager

import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.view.animation.TranslateAnimation


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
        val layoutText = RelativeLayout.LayoutParams(
            RelativeLayout.LayoutParams.WRAP_CONTENT,
            RelativeLayout.LayoutParams.WRAP_CONTENT
        )
        layoutText.setMargins(0, EDGE_LENGTH / 2, 0, 0)
        layoutText.addRule(RelativeLayout.CENTER_HORIZONTAL)
        findViewById<RelativeLayout>(R.id.container_text).layoutParams = layoutText
        findViewById<TextView>(R.id.text_desc).text = intent?.extras?.get("desc")?.toString() ?: ""

        //right
        val viewPaddingRight = View(this)
        val layoutPaddingRight = RelativeLayout.LayoutParams(PADDDING, SCREEN_HEIGHT)
        layoutPaddingRight.addRule(RelativeLayout.ALIGN_PARENT_RIGHT)
        viewPaddingRight.layoutParams = layoutPaddingRight
        viewPaddingRight.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(viewPaddingRight)

        //left
        val viewPaddingLeft = View(this)
        val layoutPaddingLeft = RelativeLayout.LayoutParams(PADDDING, SCREEN_HEIGHT)
        layoutPaddingLeft.addRule(RelativeLayout.ALIGN_PARENT_LEFT)
        viewPaddingLeft.layoutParams = layoutPaddingLeft
        viewPaddingLeft.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(viewPaddingLeft)

        //top
        val viewPaddingTop = View(this)
        val layoutPaddingTop = RelativeLayout.LayoutParams(EDGE_LENGTH, EDGE_LENGTH)
        layoutPaddingTop.addRule(RelativeLayout.CENTER_HORIZONTAL)
        viewPaddingTop.layoutParams = layoutPaddingTop
        viewPaddingTop.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(viewPaddingTop)

        //bottom
        val viewPaddingBottom = View(this)
        val layoutPaddingBottom = RelativeLayout.LayoutParams(EDGE_LENGTH, SCREEN_HEIGHT)
        layoutPaddingBottom.setMargins(0, EDGE_LENGTH * 2, 0, 0)
        layoutPaddingBottom.addRule(RelativeLayout.CENTER_HORIZONTAL)
        viewPaddingBottom.layoutParams = layoutPaddingBottom
        viewPaddingBottom.setBackgroundColor(ContextCompat.getColor(this, R.color.BLACK_SHADOW))
        backgroundLayout.addView(viewPaddingBottom)

        //view scan cursor
        val viewCursor = View(this)
        val layoutCursor = RelativeLayout.LayoutParams(EDGE_LENGTH, 5)
        layoutCursor.setMargins(0, EDGE_LENGTH, 0, 0)
        layoutCursor.addRule(RelativeLayout.CENTER_HORIZONTAL)
        viewCursor.layoutParams = layoutCursor
        viewCursor.setBackgroundColor(ContextCompat.getColor(this, R.color.BLUE_FUND))
        backgroundLayout.addView(viewCursor)

        val translateCursorAnimation: Animation = TranslateAnimation(
            0F,
            0F,
            0F,
            EDGE_LENGTH.toFloat()
        )
        translateCursorAnimation.repeatMode = Animation.REVERSE
        translateCursorAnimation.repeatCount = Animation.INFINITE
        translateCursorAnimation.duration = 2000

        viewCursor.startAnimation(translateCursorAnimation)

    }
}