// I try to make this class as a util (Static class/method) in Java.
// But it turns out that I still have to create an object of this class and call its method
//      var chordProgTree = new ChordProgTree();
//      chordProgTree.getTree("./app/controllers/chordprog.properties", this, render);
// Besides, I have to pass the context (for render to view) and callback function...  what a pain


TreeModel = require('tree-model');
var properties = require('properties');

function ChordProgTree() {

    this.tree;
    this.myMap = new Map();
}

ChordProgTree.prototype = {
    constructor:ChordProgTree,
    loadProperties:function( path, callback){
        options = {
            path: true,
            include: true,
            namespaces: true,
            sections: true
        };

        var context = this;

        properties.parse(path, options, function (error, p) {
            if (error) {
                return console.error(error);
            }

            context.buildTree(p);

            console.log('tree + ' + context.tree);
            console.log('tree + ' + context.prop);
            console.log('parse success');
            callback();

        });
    },
    getTree:function( ){
        return this.tree;
    },
    getValue:function(key) {
        return this.myMap.get(key);
    },
    buildTree:function(p){
        console.log('p' + p);
        var treeModel = new TreeModel();
        var root = treeModel.parse({name: 'root'});

        for (i in p){
            if (typeof(p[i]) === 'object'  ){
                // console.log( i,p[i])
                root.addChild( this.buildChildren(i,p[i],i) );
            }

        }
        this.tree = root;
    },
    buildChildren:function(i,p,key){
        var tree = new TreeModel();
        var node = tree.parse({name: i});
        for (i in p){
            if (typeof(p[i]) === 'object' ){
                //console.log( i,p[i])
                node.addChild( this.buildChildren(i,p[i], key + '.' + i) );
            } else if(typeof(p[i]) === 'string' ){
                console.log(key +',' + p[i]);
                this.myMap.set(key,p[i]);


                this.myMap.set('please','dontmakemelaugh');
                console.log(this.myMap);
            }

        }
        return node;
    }
}

//private functions, because we do not export it (if I understand it right)
//function buildTree(p){
//
//    console.log('p' + p);
//    var tree = new TreeModel();
//    var root = tree.parse({name: 'root'});
//
//    for (i in p){
//        if (typeof(p[i]) === 'object'  ){
//            // console.log( i,p[i])
//            root.addChild( buildChildren(i,p[i]) );
//        }else if(typeof(p[i]) === 'string' ){
//
//        }
//
//    }
//    return root;
//}

//function buildChildren(i,p){
//    var tree = new TreeModel();
//    var node = tree.parse({name: i});
//    for (i in p){
//        if (typeof(p[i]) === 'object' ){
//            //console.log( i,p[i])
//            node.addChild( buildChildren(i,p[i]) );
//        } else if(typeof(p[i]) === 'string' ){
//            console.log('pi' + p[i]);
//        }
//
//    }
//    return node;
//}

module.exports = ChordProgTree;