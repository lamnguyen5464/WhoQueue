import Foundation

class JSONSafeObject: NSObject{
  
  private var instance: [String: Any]?
  
  init(str: String){
    super.init()
    if let data = str.data(using: .utf8) {
      do {
        self.instance = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
      } catch {
        print(error.localizedDescription)
      }
    }
  }
  
  init(_instance: [String: Any]){
    self.instance = _instance
  }
  
  public func setStringSafely(field: String!, value: String?){
    guard self.instance == nil else {
      self.instance![field] = value
      return
    }
  }
  
  public func getStringSafely(field: String) -> String{
    if let value = self.instance?[field] {
      return value as! String
    }
    return "";
  }
  
  public func toString() -> String{
    guard self.instance != nil else{
      return ""
    }
    do {
      let data =  try JSONSerialization.data(withJSONObject:self.instance!, options: .prettyPrinted)
      return NSString(data: data, encoding: String.Encoding.utf8.rawValue)! as String
    } catch {
      return ""
    }
  }
  
  public func getListKeys() -> [String]{
    if let keys = self.instance?.keys {
      return Array(keys)
    }
    return [String]()
  }
}
