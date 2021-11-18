//
//  AppLink.swift
//  onLineUp
//
//  Created by lam.nguyen5 on 11/18/21.
//

import Foundation

@objc
class AppLink: NSObject {
  @objc
  public static func handleDeepLink(url: NSURL?){
    let params = url?.getParams() ?? [:]
    StorageInstance.setOneShotStorage(key: KeyCommonNative.DATA_FROM_DEEPLINK, value: params)
  }
}
