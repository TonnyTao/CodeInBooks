val orangesAreOrange = true
val turnipsAreDelicious = false

if (turnipsAreDelicious) {
    println("Mmm, tasty turnips!")
} else {
    println("Eww, turnips are horrible.")
}
// Prints "Eww, turnips are horrible."


val i = 1
if (i == 1) {
    // this example will compile successfully
}

val max = if (a > b) {
    println("Choose a")
    a
} else {
    println("Choose b")
    b
}