//
//  StorageInstance.swift
//  onLineUp
//
//  Created by lam.nguyen5 on 11/18/21.
//

import Foundation

class StorageInstance {
  private static var oneShot = [String: Any]()
  
  public static func setOneShotStorage(key: String, value: Any){
    oneShot[key] = value
  }
  
  public static func getOneShotStorage(key: String) -> Any {
    return oneShot.removeValue(forKey: key) ?? nil
  }
}
