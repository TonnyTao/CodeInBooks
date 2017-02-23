const pug = require('pug');

var fs = require("fs");
const data = fs.readFileSync('The Swift Programming Language (Swift 3.1).json');
const chapters = JSON.parse(data)

var watch = require('watch')
watch.createMonitor('./code', function(monitor) {
    monitor.on("changed", function(f, curr, prev) {
        renderHtml(monitor)
    })

    renderHtml(monitor)
})

function renderHtml(monitor) {

    var swift = {}
    var kotlin = {}
    var js = {}
    chapters.forEach(item => {
        item.details.forEach(detail => {
            console.log(detail)
            swift[detail] = fs.readFileSync(`code/apple_swift/${item.title}/${detail}.swift`)
            kotlin[detail] = fs.readFileSync(`code/apple_swift/${item.title}/${detail}.kt`)
            js[detail] = fs.readFileSync(`code/apple_swift/${item.title}/${detail}.js`)
        })
    })

    const html = pug.renderFile('index.pug', {
        chapters: chapters,
        codes: {
            swift: swift,
            kotlin: kotlin,
            javascript: js,
        }
    })

    fs.writeFile("index.html", html, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}

