var Spider = require('node-spider');
const path = require('path')
const fs = require('fs')

var spider = new Spider({
    // How many requests can be run in parallel
    concurrent: 10,
    // How long to wait after each request
    delay: 0,
    // A stream to where internal logs are sent, optional
    logs: process.stderr,
    // Re-visit visited URLs, false by default
    allowDuplicates: false,
    // If `true` all queued handlers will be try-catch'd, errors go to `error` callback
    catchErrors: true,
    // If `true` the spider will set the Referer header automatically on subsequent requests
    addReferrer: false,
    // If `true` adds the X-Requested-With:XMLHttpRequest header
    xhr: false,
    // If `true` adds the Connection:keep-alive header and forever option on request module
    keepAlive: false,
    // Called when there's an error, throw will be used if none is provided
    error: function(err, url) {
        console.log(err, url)
    },
    // Called when there are no more requests
    done: function() {
        console.log('done', chaptersTitles)
    },

    //- All options are passed to `request` module, for example:
    headers: { 'user-agent': 'node-spider' },
    encoding: 'utf8'
});

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

var urls = []
var all = []
var code = {}

var chaptersTitles = []
var chaptersDic = {}
var handleRequest = function(doc) {
    all.push(doc.url)
    const chapter = doc.$('title').text().split(' - ')[0]

    doc.$('pre').each(function(i, elem) {

        var prev = doc.$(elem).prev()
        var title = doc.$(elem).prev('h2')

        while (title.html() == null) {
            prev = prev.prev()
            if (prev[0].name === 'h1' || prev[0].name === 'h2') {
                title = prev
            }
        }

        title = title.text()
        var swifts = code[title] || ''
        swifts += `<pre>${doc.$(elem).html()}</pre>
`

        code[title] = swifts

        mkdirp(`reference/kotlin/${chapter}`)
        fs.writeFileSync(`reference/kotlin/${chapter}/${title}.html`, swifts, function(e, i) {

        })

        var items = chaptersDic[chapter] || []
        if (items.indexOf(title) === -1) {
            items.push(title)

            chaptersDic[chapter] = items
        }
    })

    //
    if (chaptersTitles.indexOf(chapter) === -1) {
        chaptersTitles.push(chapter)
    }

    var data = []
    for (var item of titles) {

        if (chaptersDic[item] && chaptersDic[item].length > 0) {
            data.push({
                title: item,
                details: chaptersDic[item]
            })
        } else {
            console.log('Not Exist', item)
        }
    }

    fs.writeFileSync(`reference/kotlin/chapter.json`, JSON.stringify(data), function() {
        console.log(e, i)
    })

    //
    doc.$('a').each(function(i, elem) {

        //     // do stuff with element
        var href = doc.$(elem).attr('href')
        if (href) { href = href.split('#')[0]; }
        if (href) {
            var url = doc.resolve(href) || '';
            //     // crawl more
            if (url.startsWith('https://kotlinlang.org/docs/reference')) {
                if (urls.indexOf(url) === -1) {

                    urls.push(url)
                    spider.queue(url, handleRequest);
                }
            }
        }
    });
};

spider.queue('https://kotlinlang.org/docs/reference', function(doc) {
    
    doc.$('div.tree-leaf-title').each((i, item)=> {
        titles.push(doc.$(item).find('.text').text())
    })
    doc.$('a.tree-leaf-title').each((i, item)=> {
        titles.push(doc.$(item).find('.text').text())
    })

    // start crawling
    spider.queue('https://kotlinlang.org/docs/reference/basic-syntax.html', handleRequest);
});
