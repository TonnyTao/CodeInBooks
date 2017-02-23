val decimalInteger = 17
val binaryInteger = 0b10001       // 17 in binary notation
val octalInteger = 0o21           // 17 in octal notation
val hexadecimalInteger = 0x11     // 17 in hexadecimal notation

val decimalDouble = 12.1875
val exponentDouble = 1.21875e1

fun Int.pow(exp: Int): Int = Math.pow(this, exp)
val i = 15*2.pow(2) //15 x 2 exp 2

val oneMillion = 1_000_000
val justOverOneMillion = 1_000_000.000_000_1

val hexBytes = 0xFF_EC_DE_5E
val bytes = 0b11010010_01101001_10010100_10010010