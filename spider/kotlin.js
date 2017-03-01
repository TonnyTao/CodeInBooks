const path = require('path')
const fs = require('fs')
var jsdom = require('jsdom');
var sanitize = require("sanitize-filename");

var jquery = fs.readFileSync("spider/jquery_3_1_1_min.js", "utf-8");

const folderName = 'Kotlin Reference' //Kotlin Reference

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

var code = {}

var chaptersTitles = []
var chaptersDic = {}
var handleRequest = function(doc) {

    const chapter = doc.$('title').text().split(' - ')[0]

    console.log('title', doc.$('title').text())

    doc.$('pre').each(function(i, elem) {

        let prev = doc.$(elem).prevAll('h2, h3, h4, h1').first()
        
        let section = prev.text()
        
        if (section === '') {
            prev = doc.$(elem).parent().prevAll('h2, h3, h4, h1').first()
            section = prev.text()
        }
        console.log('section', section)

        let fileName = sanitize(section)
        fileName = fileName.replace(/!/g, '_') //fix webpack bug: ! should not in path

        var swifts = code[fileName] || ''
        swifts += `<pre>${doc.$(elem).html()}</pre>
`
        code[fileName] = swifts

        mkdirp(`reference/${folderName}/${chapter}`)

        fs.writeFileSync(`reference/${folderName}/${chapter}/${fileName}.html`, swifts, function(e, i) {

        })

        //update sections
        var sections = chaptersDic[chapter] || []
        let exist = false
        sections.map((item, i)=>{
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
            }else {
                sections.push(fileName)
            }

            chaptersDic[chapter] = sections
        }
    })

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
};

jsdom.env({
    url: 'https://kotlinlang.org/docs/reference',
    src: [jquery],
    done: function(err, window) {
        if (err) {
            console.log('error')
            return
        }

        let urls = []
        window.$('a.tree-leaf-title').each((i, item) => {
            titles.push(window.$(item).find('.text').text())
            urls.push(window.$(item).attr('href'))
        })

        console.log(urls)

        urls.forEach((item, i) => {
            jsdom.env({
                url: `https://kotlinlang.org${item}`,
                src: [jquery],
                features: {
                    FetchExternalResources: ["script"],
                    ProcessExternalResources: ["script"],
                },
                concurrentNodeIterators: 10,
                done: function(err, window) {
                    if (err) {
                        console.log('error')
                        return
                    }

                    handleRequest(window);
                    window.close()
                }
            });
        })

        window.close()
    }
});
