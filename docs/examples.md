Run the samples    {#react-native-examples}
===================================

The Scandit Barcode Scanner SDK (downloadable from https://github.com/Scandit/barcodescanner-sdk-react-native/) comes with three demos:
* SimpleSample: shows how to use the barcode scanner in a simple react-native project.
* ExtendedSample: allows the user to configure the barcode scanner as well as the UI from the application itself.
* MatrixScanSample: shows how to use MatrixScan.

## Build the sample apps

Make sure `react-native-cli` is installed

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~{.java}
> yarn global add react-native-cli
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Install the plugin

Use the React Native CLI to download the plugin module for the sample.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~{.java}
> cd <directory of the sample>
> yarn install
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note: Running `yarn install` for one of the samples will delete dependencies of the other samples. Therefore, every time you want to run a different sample you have to rerun `yarn install` on it.

### Add Android dependencies

- Download the Barcode Scanner SDK for Android. It's available from your Scandit Barcode Scanner SDK account at http://account.scandit.com in the Downloads section.
- Inside the archive you will find a file named ScanditBarcodeScanner.aar . Copy it to <"directory of the sample">/android/libs

### Add iOS dependencies

- Download the Barcode Scanner SDK for iOS. It's available from your Scandit Barcode Scanner SDK account at http://account.scandit.com in the Downloads section.
- Inside the archive you will find a file named ScanditBarcodeScanner.framework . Copy it to <"directory of the sample">/ios/ScanditSDK

## Set License key

You will have to set your license key in the sample projects. Sign in to your account at http://account.scandit.com to look up your license key in the License Key section.

Once you locate the key, copy-paste it to the app/index.js file of the selected sample. There is already a dedicated line of code for setting the license key with a temporary placeholder, that you have to replace with your actual key:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~{.java}
ScanditModule.setAppKey('-- ENTER YOUR SCANDIT LICENSE KEY HERE --');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
