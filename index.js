import {
	NativeModules
} from 'react-native';
export { ScanSession } from './components/ScanSession';
export { BarcodePicker } from './components/BarcodePicker';
export { Barcode } from './components/Barcode';
export { ScanSettings } from './components/ScanSettings';
export { SymbologySettings } from './components/SymbologySettings';
export { ScanOverlay } from './components/ScanOverlay';

export const ScanditModule = NativeModules.ScanditModule;
