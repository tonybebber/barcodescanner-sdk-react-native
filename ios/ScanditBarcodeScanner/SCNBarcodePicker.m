//
//  SCNBarcodePicker.m
//  SCNScanditBarcodeScanner
//
//  Created by Luca Torella on 13.08.17.
//  Copyright © 2017 Scandit. All rights reserved.
//

#import "SCNBarcodePicker.h"
#import <React/RCTLog.h>

@import ScanditBarcodeScanner;

static inline NSDictionary<NSString *, id> *dictionaryFromQuadrilateral(SBSQuadrilateral quadrilateral) {
    return @{
             @"topLeft": @[@(quadrilateral.topLeft.x), @(quadrilateral.topLeft.y)],
             @"topRight": @[@(quadrilateral.topRight.x), @(quadrilateral.topRight.y)],
             @"bottomLeft": @[@(quadrilateral.bottomLeft.x), @(quadrilateral.bottomLeft.y)],
             @"bottomRight": @[@(quadrilateral.bottomRight.x), @(quadrilateral.bottomRight.y)],
             };
}

static NSDictionary<NSString *, id> *dictionaryFromCode(SBSCode *code, NSNumber *identifier) {
    NSMutableArray<NSNumber *> *bytesArray = [NSMutableArray arrayWithCapacity:code.rawData.length];
    if (code.rawData != nil) {
        unsigned char *bytes = (unsigned char *)[code.rawData bytes];
        for (int i = 0; i < code.rawData.length; i++) {
            [bytesArray addObject:@(bytes[i])];
        }
    }

    return @{
             @"id": identifier ?: @(-1),
             @"rawData": bytesArray,
             @"data": code.data ?: @"",
             @"symbology": code.symbologyName,
             @"compositeFlag": @(code.compositeFlag),
             @"isGs1DataCarrier": [NSNumber numberWithBool:code.isGs1DataCarrier],
             @"isRecognized": [NSNumber numberWithBool:code.isRecognized],
             @"location": dictionaryFromQuadrilateral(code.location),
             };
}

static inline NSDictionary *dictionaryFromScanSession(SBSScanSession *session) {
    NSMutableArray *allRecognizedCodes = [NSMutableArray arrayWithCapacity:session.allRecognizedCodes.count];
    for (SBSCode *code in session.allRecognizedCodes) {
        [allRecognizedCodes addObject:dictionaryFromCode(code, nil)];
    }
    NSMutableArray *newlyLocalizedCodes = [NSMutableArray arrayWithCapacity:session.newlyLocalizedCodes.count];
    for (SBSCode *code in session.newlyLocalizedCodes) {
        [newlyLocalizedCodes addObject:dictionaryFromCode(code, nil)];
    }
    NSMutableArray *newlyRecognizedCodes = [NSMutableArray arrayWithCapacity:session.newlyRecognizedCodes.count];
    int i = 0;
    for (SBSCode *code in session.newlyRecognizedCodes) {
        [newlyRecognizedCodes addObject:dictionaryFromCode(code, @(i))];
        i++;
    }
    return @{
             @"allRecognizedCodes": allRecognizedCodes,
             @"newlyLocalizedCodes": newlyLocalizedCodes,
             @"newlyRecognizedCodes": newlyRecognizedCodes,
             };
}

static inline NSDictionary *dictionaryFromTrackedCodes(NSDictionary<NSNumber *, SBSTrackedCode *> *trackedCodes) {
    NSMutableArray *newlyTrackedCodes = [NSMutableArray arrayWithCapacity:trackedCodes.count];
    for (NSNumber *identifier in trackedCodes) {
        [newlyTrackedCodes addObject:dictionaryFromCode(trackedCodes[identifier], identifier)];
    }
    return @{@"newlyTrackedCodes": newlyTrackedCodes};
}

@interface SCNBarcodePicker () <SBSScanDelegate, SBSProcessFrameDelegate>

@property (nonatomic) BOOL shouldStop;
@property (nonatomic) BOOL shouldPause;
@property (nonatomic, nullable) NSArray<NSNumber *> *codesToReject;
@property (nonatomic) dispatch_semaphore_t didScanSemaphore;

// MatrixScan
@property (nonatomic) dispatch_semaphore_t didProcessFrameSemaphore;
@property (nonatomic) BOOL matrixScanEnabled;
@property (nonatomic, nullable) NSArray<NSNumber *> *idsToVisuallyReject;
@property (nonatomic, nullable) NSSet<NSNumber *> *lastFrameRecognizedIds;

@end

@implementation SCNBarcodePicker

- (instancetype)init {
    self = [super init];
    if (self) {
        _matrixScanEnabled = NO;
        SBSScanSettings *scanSettings = [SBSScanSettings defaultSettings];
        _picker = [[SBSBarcodePicker alloc] initWithSettings:scanSettings];
        _picker.scanDelegate = self;
        _didScanSemaphore = dispatch_semaphore_create(0);
        _didProcessFrameSemaphore = dispatch_semaphore_create(0);
        [self addSubview:_picker.view];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.picker.view.frame = self.bounds;
}

- (void)setScanSettings:(NSDictionary *)dictionary {
    _scanSettings = dictionary;
    NSError *error = nil;
    SBSScanSettings *scanSettings = [SBSScanSettings settingsWithDictionary:dictionary error:&error];
    if (error != nil) {
        RCTLogError(@"Invalid scan settings: %@", error.localizedDescription);
    } else {
        __weak typeof(self)weakSelf = self;
        self.matrixScanEnabled = scanSettings.matrixScanEnabled;
        [self.picker applyScanSettings:scanSettings completionHandler:^{
            __strong typeof(weakSelf)strongSelf = weakSelf;
            if (strongSelf.onSettingsApplied != nil) {
                strongSelf.onSettingsApplied(@{});
            }
        }];
    }
}

- (void)finishOnScanCallbackShouldStop:(BOOL)shouldStop
                           shouldPause:(BOOL)shouldPause
                         codesToReject:(NSArray<NSNumber *> *)codesToReject {
    self.shouldStop = shouldStop;
    self.shouldPause = shouldPause;
    self.codesToReject = codesToReject;
    dispatch_semaphore_signal(self.didScanSemaphore);
}

- (void)finishOnRecognizeNewCodesShouldStop:(BOOL)shouldStop
                                shouldPause:(BOOL)shouldPause
                        idsToVisuallyReject:(NSArray<NSNumber *> *)idsToVisuallyReject {
    self.shouldStop = shouldStop;
    self.shouldPause = shouldPause;
    self.idsToVisuallyReject = idsToVisuallyReject;
    dispatch_semaphore_signal(self.didProcessFrameSemaphore);
}

- (void)setMatrixScanEnabled:(BOOL)matrixScanEnabled {
    if (_matrixScanEnabled != matrixScanEnabled) {
        _matrixScanEnabled = matrixScanEnabled;
        self.picker.processFrameDelegate = matrixScanEnabled ? self : nil;
    }
}

#pragma mark - SBSScanDelegate

- (void)barcodePicker:(SBSBarcodePicker *)picker didScan:(SBSScanSession *)session {
    if (self.onScan) {
        self.onScan(dictionaryFromScanSession(session));
    }
    // Suspend the session thread, until finishOnScanCallbackShouldStop:shouldPause:codesToReject: is called from JS
    dispatch_semaphore_wait(self.didScanSemaphore, DISPATCH_TIME_FOREVER);
    if (self.shouldStop) {
        [session stopScanning];
    } else if (self.shouldPause) {
        [session pauseScanning];
    } else {
        for (NSNumber *index in self.codesToReject) {
            if (index.integerValue == -1) {
                continue;
            }
            SBSCode *code = session.newlyRecognizedCodes[index.integerValue];
            [session rejectCode:code];
        }
        self.codesToReject = nil;
    }
}

#pragma mark - SBSProcessFrameDelegate

- (void)barcodePicker:(nonnull SBSBarcodePicker *)barcodePicker
      didProcessFrame:(nonnull CMSampleBufferRef)frame
              session:(nonnull SBSScanSession *)session {
    if (session.trackedCodes == nil) {
        return;
    }

    NSMutableSet<NSNumber *> *recognizedCodeIds = [NSMutableSet set];
    NSMutableDictionary<NSNumber *, SBSTrackedCode *> *newlyTrackedCodes = [NSMutableDictionary dictionary];

    for (NSNumber *identifier in session.trackedCodes.allKeys) {
        SBSTrackedCode *code = session.trackedCodes[identifier];
        if (code.isRecognized) {
            [recognizedCodeIds addObject:identifier];
            if (self.lastFrameRecognizedIds == nil || ![self.lastFrameRecognizedIds containsObject:identifier]) {
                newlyTrackedCodes[identifier] = code;
            }
        }
    }
    self.lastFrameRecognizedIds = recognizedCodeIds;

    if (newlyTrackedCodes.count > 0) {
        NSDictionary *newCodes = dictionaryFromTrackedCodes(newlyTrackedCodes);
        self.onRecognizeNewCodes(newCodes);

        // Suspend the session thread, until finishOnRecognizeNewCodesShouldStop:shouldPause:idsToVisuallyReject: is called from JS
        dispatch_semaphore_wait(self.didProcessFrameSemaphore, DISPATCH_TIME_FOREVER);
        if (self.shouldStop) {
            [session stopScanning];
        } else if (self.shouldPause) {
            [session pauseScanning];
        } else {
            for (NSNumber *identifier in self.idsToVisuallyReject) {
                SBSTrackedCode *code = session.trackedCodes[identifier];
                [session rejectTrackedCode:code];
            }
            self.idsToVisuallyReject = nil;
        }
    }
}

@end
