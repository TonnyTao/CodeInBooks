fun test() {
    val result = try {
        count()
    } catch (e: ArithmeticException) {
        //handler
    } catch (e: OtherException) {
        //handler
    }
    // Working with result
}