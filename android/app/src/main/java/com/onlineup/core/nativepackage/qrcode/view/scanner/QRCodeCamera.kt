package com.onlineup.core.nativepackage.qrcode.view.scanner

import android.annotation.SuppressLint
import android.media.Image
import android.util.Log
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.lifecycle.LifecycleOwner
import com.google.common.util.concurrent.ListenableFuture
import com.google.mlkit.vision.barcode.Barcode
import com.google.mlkit.vision.barcode.BarcodeScannerOptions
import com.google.mlkit.vision.barcode.BarcodeScanning
import com.google.mlkit.vision.common.InputImage
import java.util.concurrent.Executor

class QRCodeCamera(
        private val listenerCamera: ListenableFuture<ProcessCameraProvider>,
        private val previewView: PreviewView,
        private val executor: Executor,
        private val onFoundQRCallBack: (String) -> Unit
) {
    private var haveFound = false

    fun start(lifecycleOwner: LifecycleOwner) {
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
                            it.setAnalyzer(executor, this::getCameraAnalyzer)
                        }


                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                        lifecycleOwner,
                        cameraSelector,
                        preview,
                        imageCapture,
//                        imageAnalyzer
                )
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }, executor)
    }

    @SuppressLint("UnsafeOptInUsageError")
    private fun getCameraAnalyzer(imageProxy: ImageProxy) {
        try {
            imageProxy.image?.let { image ->
                val inputImage = InputImage.fromMediaImage(image, imageProxy.imageInfo.rotationDegrees)

                val barcodeScanner = BarcodeScanning.getClient(BarcodeScannerOptions.Builder()
                        .setBarcodeFormats(
                                Barcode.FORMAT_QR_CODE,
                                Barcode.FORMAT_AZTEC)
                        .build())

                barcodeScanner.process(inputImage)
                        .addOnSuccessListener { listBarcode ->
                            for (barcode in listBarcode) {
                                if (!haveFound) {
                                    haveFound = true
                                    onFoundQRCallBack(barcode?.rawValue.toString())
                                }
                            }
                        }
                        .addOnCompleteListener {
                            imageProxy.close()
                        }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}