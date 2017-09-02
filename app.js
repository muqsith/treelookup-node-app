var TreeLookup = require('./index.e629c34edf');

var tree = new TreeLookup();

function result_processor(cb) {
    var _result = undefined;
    return function(result) {        
        if (typeof _result === 'undefined') {
            _result = result;
            if (_result.length > 1) {
                _result = _result.substring(1);
            }
            cb(_result);
        }
    };
}


// Breadth first - getChildrenAsCallback
function get_breadthfirst_callback_search() {
    var count = 1;
    var result = '';
    return (function breadthfirst_callback_search (n, cb, p) {
        if (!p) {
            p = '/';
        }
        tree.getChildrenAsCallback(p, function(err, children) {
            count -= 1;
            if (children.indexOf(n) !== -1) {
                result = p;
                count = 0;
            } else {
                for (var i=0; i<children.length; i+=1) {
                    breadthfirst_callback_search(n, cb, p+'/'+children[i]);
                    count += 1;
                }
            }
            if (count === 0) {
                cb(result);
            }
        });
    });    
}

// Breadth first - getChildrenAsPromise
function get_breadthfirst_promise_search() {
    var count = 1;
    var result = '';
    return (function breadthfirst_promise_search(n, p) {
        return new Promise(function(resolve, reject){
            if (!p) {
                p = '/';
            }
            tree.getChildrenAsPromise(p).then(function(children){
                count -= 1;
                if (children.indexOf(n) !== -1) {
                    result = p;
                    count = 0;
                } else {
                    for (var i=0; i<children.length; i+=1) {
                        breadthfirst_promise_search(n, p+'/'+children[i]).then(resolve);
                        count += 1;
                    }
                }
                if (count === 0) {
                    resolve(result);
                }
            });
        });
    });    
}

// Depth first - getChildrenAsCallback
function get_depthfirst_callback_search() {
    var count = 1;
    var result = '';
    return (function depthfirst_callback_search (n, cb, p) {
        if (!p) {
            p = '/';
        }
        tree.getChildrenAsCallback(p, function(err, children) {
            count -= 1;
            for (var i=0; i<children.length; i+=1) {
                if (children[i] === n) {
                    result = p;
                    count = 0;
                    break;
                } else {
                    depthfirst_callback_search(n, cb, p+'/'+children[i]);
                    count += 1;
                }
            }
            if (count === 0) {
                cb(result);
            }
        });
    });    
}

// Depth first - getChildrenAsPromise
function get_depthfirst_promise_search() {
    var count = 1;
    var result = '';
    return (function depthfirst_promise_search(n, p) {
        return new Promise(function(resolve, reject){
            if (!p) {
                p = '/';
            }
            tree.getChildrenAsPromise(p).then(function(children){
                count -= 1;
                for (var i=0; i<children.length; i+=1) {
                    if (children[i] === n) {
                        result = p;
                        count = 0;
                        break;
                    } else {
                        depthfirst_promise_search(n, p+'/'+children[i]).then(resolve);
                        count += 1;
                    }
                }
                if (count === 0) {
                    resolve(result);
                }
            });
        });
    });    
}


function search_breadthfirst_callback(num, cb) {
    var _cb = result_processor(cb);
    var search = get_breadthfirst_callback_search();
    search(num, _cb);
}

function search_breadthfirst_promise(num) {
    return new Promise(function(resolve, reject) {
        var _resolve = result_processor(resolve);
        var search = get_breadthfirst_promise_search();
        search(num).then(_resolve);
    });
}

function search_depthfirst_callback(num, cb) {
    var _cb = result_processor(cb);
    var search = get_depthfirst_callback_search();
    search(num, _cb);
}

function search_depthfirst_promise(num) {
    return new Promise(function(resolve, reject) {
        var _resolve = result_processor(resolve);
        var search = get_depthfirst_promise_search();
        search(num).then(_resolve);
    });
}

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
    search_breadthfirst_callback(num, show);
    search_breadthfirst_promise(num).then(show);
    search_depthfirst_callback(num, show);
    search_depthfirst_promise(num).then(show);
}




