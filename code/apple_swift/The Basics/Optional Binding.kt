val actualNumber = possibleNumber.toIntOrNull()
if (actualNumber != null) {
    println("\"\(possibleNumber)\" has an integer value of ${actualNumber!!}")
} else {
    println("\"\(possibleNumber)\" could not be converted to an integer")
}