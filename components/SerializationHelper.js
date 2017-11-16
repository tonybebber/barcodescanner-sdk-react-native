import { ScanSession } from './ScanSession';
import { MatrixScanSession } from './MatrixScanSession';

export class SerializationHelper {

  static serializeScanSession(scanSession) {
    return [scanSession.shouldStop, scanSession.shouldPause,
      scanSession.rejectedCodes];
  }

  static deserializeScanSession(map) {
    return new ScanSession(map.allRecognizedCodes, map.newlyRecognizedCodes,
      map.newlyLocalizedCodes);
  }
  
  static deserializeMatrixScanSession(map) {
    return new MatrixScanSession(map.newlyTrackedCodes);
  }

}
