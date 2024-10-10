package io.ionic.starter;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import io.radar.sdk.Radar;

public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    Radar.initialize(this, "YOUR_KEY_HERE");

    super.onCreate(savedInstanceState);
  }

}
