Example code     {#react-native-examples}
===================================

For barcode scanner usage examples, you can either use the sample app included in the plugin archive, or paste one of the samples below into your index.js file.

## Build the sample apps

Make sure `react-native-cli` is installed

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~{.java}
> npm install -g react-native-cli
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Install the plugin

Use the React Native CLI to download the plugin module for the sample.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~{.java}
> cd <directory of the sample>
> npm install
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Add Android dependencies

- Download the Barcode Scanner SDK for Android. It's available from your Scandit Barcode Scanner SDK account at http://account.scandit.com in the Downloads section.
- Inside the archive you will find a file named ScanditBarcodeScanner.aar . Copy it to <"directory of the sample">/android/libs

### Add iOS dependencies

- Download the Barcode Scanner SDK for iOS. It's available from your Scandit Barcode Scanner SDK account at http://account.scandit.com in the Downloads section.
- Inside the archive you will find a file named ScanditBarcodeScanner.framework . Copy it to <"directory of the sample">/ios/ScanditSDK

## Run the sample

From the directory of the sample, you can run the app with the following commands:

### Run the sample on Android

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~{.java}
> react-native run-android
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Run the sample on iOS

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~{.java}
> react-native run-ios
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
