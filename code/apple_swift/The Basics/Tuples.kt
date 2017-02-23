data class Pair<out A, out B> : Serializable (source)

val http404Error = Pair(404, "Not Found")
// http404Error is of type Pair<Int, String>, and equals (404, "Not Found")


val (statusCode, statusMessage) = http404Error
println("The status code is ${statusCode}")
println("The status message is ${statusMessage}")


val (justTheStatusCode, _) = http404Error
println("The status code is ${justTheStatusCode}")


println("The status code is ${http404Error.first}")
println("The status message is ${http404Error.second}")


val http200Status = Pair(200, "OK")
println("The status code is ${http200Status.first}")
println("The status message is ${http200Status.second}")
