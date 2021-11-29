package com.onlineup

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.content.ContextCompat
import java.nio.ByteBuffer

class QRCodeScannerView : AppCompatActivity() {

    private class CustomAnalyzer : ImageAnalysis.Analyzer {

        private fun ByteBuffer.toByteArray(): ByteArray {
            rewind()    // Rewind the buffer to zero
            val data = ByteArray(remaining())
            get(data)   // Copy the buffer into a byte array
            return data // Return the byte array
        }

        @SuppressLint("UnsafeOptInUsageError")
        override fun analyze(image: ImageProxy) {

//            val buffer = image.planes[0].buffer
//            val data = buffer.toByteArray()
//            val pixels = data.map { it.toInt() and 0xFF }
//            val luma = pixels.average()
//
//            listener(luma)

            image.let {

                Log.d("@@@", it.image?.height.toString());
                it.close()
            }

        }
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.qrcode_scanner_view)

        val previewView = findViewById<PreviewView>(R.id.camera_view)

        val listenerCamera = ProcessCameraProvider.getInstance(this)

        listenerCamera.addListener({
            try {
                val cameraProvider: ProcessCameraProvider = listenerCamera.get()
                val preview = Preview.Builder().build()
                    .also {
                        it.setSurfaceProvider(previewView.surfaceProvider)
                    }

                // Select back camera as a default
                val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

                val imageCapture = ImageCapture.Builder()
                    .build()

                val imageAnalyzer = ImageAnalysis.Builder()
                    .build()
                    .also {
                        it.setAnalyzer(ContextCompat.getMainExecutor(this), CustomAnalyzer())
                    }


                // Unbind use cases before rebinding
                cameraProvider.unbindAll()

                // Bind use cases to camera
                cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    preview,
                    imageCapture,
//                    imageAnalyzer
                )
            } catch (e: Exception) {
                Log.e("@@", "Use case binding failed" + e.message)
            }
        }, ContextCompat.getMainExecutor(this))

    }
}