const http404Error = {statusCode: 404, statusMessage: "Not Found"}


const {statusCode, statusMessage} = http404Error
console.log(`The status code is ${statusCode}`)
//The status code is 404

const {_, statusMessage:statusMsg} = http404Error
console.log(`The status message is ${statusMsg}`)
//The status message is Not Found
