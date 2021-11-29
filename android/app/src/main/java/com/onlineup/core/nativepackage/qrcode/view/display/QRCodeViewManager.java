package com.onlineup.core.nativepackage.qrcode.view.display;

import android.view.LayoutInflater;
import android.widget.ImageView;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.onlineup.R;
import com.onlineup.core.nativepackage.qrcode.helper.QRCodeHelper;

public class QRCodeViewManager extends SimpleViewManager<QRCodeView> {
    public static final String VIEW_NAME = "QRCodeView";

    @NonNull
    @Override
    public String getName() {
        return VIEW_NAME;
    }

    @ReactProp(name = "value")
    public void setValue(QRCodeView view, String value) {
        ((ImageView) view.findViewById(R.id.qrcode)).setImageBitmap(
                QRCodeHelper.createQRCodeBitmap(value, 150)
        );
    }


    @NonNull
    @Override
    protected QRCodeView createViewInstance(@NonNull ThemedReactContext reactContext) {
        QRCodeView qrCodeView = (QRCodeView) LayoutInflater.from(reactContext).inflate(R.layout.qrcode_view, null);

        return qrCodeView;
    }
}
