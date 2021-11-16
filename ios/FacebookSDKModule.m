//
//  FacebookModule.h
//  onLineUp
//
//  Created by lam.nguyen5 on 11/16/21.
//

#import <Foundation/Foundation.h>
#import "onLineUp-Bridging-Header.h"

@interface RCT_EXTERN_MODULE(FacebookSDKModule, NSObject)

RCT_EXTERN_METHOD(login: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

RCT_EXTERN_METHOD(getToken: (RCTPromiseResolveBlock) resolve
                  rejecter: (RCTPromiseRejectBlock) reject)

@end
