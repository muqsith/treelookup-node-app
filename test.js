var TreeLookup = require('./index.e629c34edf');
var TreeSearch = require('./tree-search');

var treelookup = new TreeLookup();

var treesearch = new TreeSearch(treelookup);

// Tests

function show(result) {
    // do something with result.
    if (result) {
        console.log(result);
    } else {
        console.log('Number not found');
    }
}

if (require.main === module) {
    var num = process.argv[2];
    treesearch.breadthfirst_callback(num, show);
    treesearch.breadthfirst_promise(num).then(show);
    treesearch.depthfirst_callback(num, show);
    treesearch.depthfirst_promise(num).then(show);
}