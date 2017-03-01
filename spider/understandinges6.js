const path = require('path')
const fs = require('fs')
var jsdom = require('jsdom');
var sanitize = require("sanitize-filename");

var jquery = fs.readFileSync("spider/jquery_3_1_1_min.js", "utf-8");

const folderName = 'Understanding ES6' //Kotlin Reference

var titles = []

function mkdirp(filepath) {
    var dirname = path.dirname(filepath);

    if (!fs.existsSync(dirname)) {
        mkdirp(dirname);
    }

    try {
        fs.mkdirSync(filepath);
    } catch (e) {

    }
}

var codes = {}

var chaptersTitles = []
var chaptersDic = {}
var handleRequest = function(doc) {

    doc.$('figure').each(function(i, elem) {
        let chapter = doc.$(elem).prevAll('h2').first().text()
        let section = doc.$(elem).prevAll('h4').first().text()

        if (chapter === '') {
            chapter = doc.$(elem).parent().prevAll('h2').first().text()
        }
        if (section === '') {
            section = doc.$(elem).parent().prevAll('h4').first().text()
        }

        console.log(chapter, section)

        let fileName = sanitize(section)
        fileName = fileName.replace(/!/g, '_') //fix webpack bug: ! should not in path

        var code = codes[fileName] || ''
        code += `<pre>${doc.$(elem).find('pre').html()}</pre>
`
        codes[fileName] = code

        mkdirp(`reference/${folderName}/${chapter}`)

        fs.writeFileSync(`reference/${folderName}/${chapter}/${fileName}.html`, code, function(e, i) {

        })

        //update sections
        var sections = chaptersDic[chapter] || []
        let exist = false
        sections.map((item, i) => {
            if (item === fileName || item.file === fileName) {
                exist = true
            }
        })

        if (!exist) {
            if (section !== fileName) {
                sections.push({
                    name: section,
                    file: fileName
                })
            } else {
                sections.push(fileName)
            }

            chaptersDic[chapter] = sections
        }

        //
        if (chaptersTitles.indexOf(chapter) === -1) {
            chaptersTitles.push(chapter)
        }

        var data = []
        for (let item of titles) {

            if (chaptersDic[item] && chaptersDic[item].length > 0) {
                data.push({
                    title: item,
                    details: chaptersDic[item]
                })
            } else {
                // console.log('Not Exist', item)
            }
        }

        fs.writeFileSync(`reference/${folderName}/chapters.json`, JSON.stringify(data), function() {
            console.log(e, i)
        })
    })
};

jsdom.env({
    url: 'https://leanpub.com/understandinges6/read',
    src: [jquery],
    done: function(err, window) {
        if (err) {
            console.log('error')
            return
        }

        window.$('h2').each((i, item) => {
            titles.push(window.$(item).text())
        })

        console.log(titles)

        handleRequest(window);

        window.close()
    }
});
