Change the length of barcodes to decode {#react-native-active-symbols-counts}
=========================================================================

## Motivation

By default the Scandit Barcode Scanner scans barcodes with a fixed symbol count range.
Under certain conditions it is helpful to modify the length of the barcode to be decoded, for example if:

* you want to scan longer codes which cannot be decoded with the default settings.
* to optimize decoder performance for codes of certain lengths when the application only requires scanning particular barcode lengths.

The active symbol count setting is ignored for fixed-size barcodes (EAN and UPC barcodes) as well as 2d codes.

## Change the barcode length

To know the symbol count of a barcode, you can either:
* scan it with the "Any Code" mode of the Scandit demo app, available on the <a href="https://itunes.apple.com/app/id453880584">App Store</a> and <a href="https://play.google.com/store/apps/details?id=com.scandit.demoapp">Google Play Store</a>.
* have a look at <a href="../c_api/symbologies.html">Calculating symbol counts for variable-length symbologies</a>.


Changing the length of the barcodes is done through {@link Scandit.SymbologySettings.activeSymbolCounts activeSymbolCounts} on the symbology settings object.
Following is an example of changing the symbol count range (7-20) for Code 128 barcodes.


~~~~~~~~~~~~~~~~{.java}

var symbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
settings.getSymbologySettings(Barcode.Symbology.CODE128).activeSymbolCounts = symbolCounts;

~~~~~~~~~~~~~~~~
