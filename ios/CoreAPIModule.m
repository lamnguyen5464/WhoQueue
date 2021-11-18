//
//  CoreAPIModule.m
//  onLineUp
//
//  Created by lam.nguyen5 on 11/18/21.
//

#import <Foundation/Foundation.h>
#import "onLineUp-Bridging-Header.h"

@interface RCT_EXTERN_MODULE(CoreAPIModule, NSObject)

RCT_EXTERN_METHOD(setOneShotStorage: (NSString) key
                  forValue: (NSString) value)

RCT_EXTERN_METHOD(getOneShotStorage: (NSString) key
                  resolver: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

@end
