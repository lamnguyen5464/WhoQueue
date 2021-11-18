//
//  URL+Extension.swift
//  onLineUp
//
//  Created by lam.nguyen5 on 11/18/21.
//

import Foundation

extension NSURL {
  func getParams() -> [String: Any] {
    var result = [String: Any]()
    if let components = URLComponents(string: self.absoluteString!) {
      if let queryItems = components.queryItems {
        for item in queryItems {
          result[item.name] = item.value!
        }
      }
      return result
    } else {
      return [:]
    }
  }
}
