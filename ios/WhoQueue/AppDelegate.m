#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import "FBSDKCoreKit/FBSDKCoreKit.h"

#import <FBSDKLoginKit/FBSDKLoginKit.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"WhoQueue"
                                            initialProperties:nil];
  
  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  //Config Facebook
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  
  NSArray *permissions = @[@"public_profile", @"email"];
  
  FBSDKLoginManager *loginMgr = [[FBSDKLoginManager alloc] init];
  [loginMgr logInWithPermissions:permissions fromViewController:nil handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
    if (error) {
      NSLog(@"@@@ error");
      
    }
    
    if (result.isCancelled || !result.token) {
      NSLog(@"@@@ cancel");
    }
    
    NSInteger expiration = [result.token.expirationDate timeIntervalSince1970];
    NSLog(@"@@@ sucess: %@", result.token.tokenString);
//              resolve(@{
//                        @"type": @"success",
//                        @"token": result.token.tokenString,
//                        @"expires": @(expiration),
//                        @"permissions": [result.token.permissions allObjects],
//                        @"declinedPermissions": [result.token.declinedPermissions allObjects]
//                        });
  }];
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
