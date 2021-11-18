//
//  CoreAPI.swift
//  onLineUp
//
//  Created by lam.nguyen5 on 11/18/21.
//

import Foundation

@objc(CoreAPIModule)
class CoreAPIModule: NSObject {
  
  @objc
  public func setOneShotStorage(_ key: NSString, forValue value: NSString){
    StorageInstance.setOneShotStorage(key: key as String, value: value)
  }
  
  @objc
  public func getOneShotStorage(_ key: NSString, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
    resolve(StorageInstance.getOneShotStorage(key: key as String))
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {
    return KeyCommonNative.getAllKey()
  }
}
