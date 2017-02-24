val defaultColorName = "red"
var userDefinedColorName: String?   // defaults to nil
 
var colorNameToUse = userDefinedColorName ?: defaultColorName
// userDefinedColorName is nil, so colorNameToUse is set to the default of "red"