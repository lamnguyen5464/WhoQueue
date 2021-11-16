//
//  FacebookModule.swift
//  onLineUp
//
//  Created by lam.nguyen5 on 11/16/21.
//

import Foundation
import React
import FBSDKLoginKit
import FBSDKCoreKit

@objc(FacebookSDKModule)
class FacebookSDKModule: NSObject{
  @objc
  func login(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
    let loginManager = LoginManager()
    loginManager.logIn(permissions: ["public_profile", "email"], from: nil){ result, error in
      if error != nil || (result?.isCancelled ?? false) {
        reject("Error", "", error)
      }
      resolve(["token": result?.token?.tokenString])
    }
  }
  
  @objc
  func getToken(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
    if let currentToken = AccessToken.current {
      resolve(["token": currentToken.tokenString])
    } else {
      login(resolve, rejecter: reject)
    }
    
  }
}
