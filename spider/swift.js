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
    const chapter = doc.$('title').text().split(': ')[1]
    console.log(chapter)
    // const chapter = path.basename(doc.url).split('.')[0]

    doc.$('div .Swift').each(function(i, elem) {
        var parent = doc.$(elem).parent()
        while (!parent.hasClass('section')) {
            parent = parent.parent()
        }

        const title = doc.$(parent).children('h3').text()
        var swifts = code[title] || ''
        swifts += doc.$(elem).html()

        code[title] = swifts

        mkdirp(`reference/swift/${chapter}`)
        fs.writeFileSync(`reference/swift/${chapter}/${title}.html`, swifts, function(e, i) {

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
        }else {
            console.log('Not Exist', item)
        }
    }

    fs.writeFileSync('reference/swift/chapters.json', JSON.stringify(data), function() {
        console.log(e, i)
    })

    //
    doc.$('a').each(function(i, elem) {

        var href = doc.$(elem).attr('href')
        if (href) { href = href.split('#')[0]; }
        if (href) {
            var url = doc.resolve(href) || '';
            
            if (url.startsWith('https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language')) {
                if (urls.indexOf(url) === -1) {

                    urls.push(url)
                    spider.queue(url, handleRequest);
                }
            }
        }
    });
};

spider.queue('https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language', function(doc) {
    
    const targetNav = doc.$('a').filter((i, item)=>{
        return doc.$(item).text() === 'Language Guide'
    })
    doc.$(targetNav[0]).parent().find('li.nav-chapter').each((i, item)=> {
        const chapter = doc.$(item).find('a').text()
        titles.push(chapter)
    })
    console.log(titles)

    // start crawling
    spider.queue('https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html', handleRequest);
});
