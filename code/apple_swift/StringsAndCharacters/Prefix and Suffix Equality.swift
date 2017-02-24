let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 2 Scene 1: Outside Capulet's mansion",
]

for scene in romeoAndJuliet {
    if scene.hasPrefix("Act 1 ") {
        print("hasPrefix")
    }else if scene.hasSuffix("mansion") {
        print("hasSuffix")
    }
}

