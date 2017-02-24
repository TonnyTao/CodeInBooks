let dogString = "Dog‼🐶"

for codeUnit in dogString.utf8 {
    print("\(codeUnit) ", terminator: "")
}
// 68 111 103 226 128 188 240 159 144 182


for codeUnit in dogString.utf16 {
    print("\(codeUnit) ", terminator: "")
}
// Prints "68 111 103 8252 55357 56374 "


for scalar in dogString.unicodeScalars {
    print("\(scalar.value) ", terminator: "")
}
// Prints "68 111 103 8252 128054 "