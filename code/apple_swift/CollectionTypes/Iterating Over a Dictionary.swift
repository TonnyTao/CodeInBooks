for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
// YYZ: Toronto Pearson
// LHR: London Heathrow


for airportCode in airports.keys {
    print("Airport code: \(airportCode)")
}
 
for airportName in airports.values {
    print("Airport name: \(airportName)")
}

let airportCodes = [String](airports.keys)

let airportNames = [String](airports.values)