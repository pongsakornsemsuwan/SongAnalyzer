// I try to make this class as a util (Static class/method) in Java.
// But it turns out that I still have to create an object of this class and call its method
//      var chordProgTree = new ChordProgTree();
//      chordProgTree.getTree("./app/controllers/chordprog.properties", this, render);
// Besides, I have to pass the context (for render to view) and callback function...  what a pain


TreeModel = require('tree-model');
var properties = require('properties');

function ChordProgTree(propertiesPath, controller, callback) {

}

ChordProgTree.prototype = {
    constructor:ChordProgTree,
    getTree:function(  propertiesPath, controller, callback ){
        options = {
            path: true,
            include: true,
            namespaces: true,
            sections: true
        };

        properties.parse(propertiesPath, options, function (error, p) {
            if (error) {
                return console.error(error);
            }

            console.log('parseeeeeee');

            node = buildTree(p);

            //instead of return node;, I have to call a callback function
            //because Node.js do this in an asynchronous fashion. It does not wait for return.
            callback(node, controller);

        });
    },
    getValue:function(key) {
        return properties.key;
    }
}

//private functions, because we do not export it (if I understand it right)
function buildTree(p){

    var tree = new TreeModel();
    var root = tree.parse({name: 'root'});

    for (i in p){
        if (typeof(p[i]) === 'object'  ){
            // console.log( i,p[i])
            root.addChild( buildChildren(i,p[i]) );
        }

    }
    return root;
}

function buildChildren(i,p){
    var tree = new TreeModel();
    var node = tree.parse({name: i});
    for (i in p){
        if (typeof(p[i]) === 'object' ){
            //console.log( i,p[i])
            node.addChild( buildChildren(i,p[i]) );
        }
    }
    return node;
}

module.exports = ChordProgTree;