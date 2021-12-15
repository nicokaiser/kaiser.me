const fs = require('fs');
const posthtml = require('posthtml');
const postcss = require('posthtml-postcss');
const htmlnano = require('htmlnano');

posthtml([
    postcss(),
    htmlnano()
])
    .process(fs.readFileSync(__dirname + '/../src/index.html'), {
        from: __dirname + '/../src/index.html'
    })
    .then((result) => {
        fs.writeFileSync(__dirname + '/../public/index.html', result.html);
    })
    .catch((err) => {
        console.error(err);
    });
