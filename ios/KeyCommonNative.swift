//
//  KeyCommonNative.swift
//  onLineUp
//
//  Created by lam.nguyen5 on 11/18/21.
//

import Foundation

class KeyCommonNative {
  public static let COMMON_NATIVE_EMITTING = "COMMON_NATIVE_EMITTING";
  
  // oneShotStorage keys
  public static let DATA_FROM_NOTIFICATION = "DATA_FROM_NOTIFICATION";
  public static let DATA_FROM_DEEPLINK = "DATA_FROM_DEEPLINK";
  
  public static func getAllKey() -> [String: String] {
    return [
      COMMON_NATIVE_EMITTING: COMMON_NATIVE_EMITTING,
      DATA_FROM_NOTIFICATION: DATA_FROM_NOTIFICATION,
      DATA_FROM_DEEPLINK: DATA_FROM_DEEPLINK
    ]
  }
}
