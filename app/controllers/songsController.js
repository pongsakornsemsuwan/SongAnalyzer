Note = require('../model/note.js');
Chord = require('../model/chord.js');
ChordProgTree = require('../util/chordProgTree.js');
TreeModel = require('tree-model');
SongService = require('../controllers/service/songService.js');

var locomotive = require('locomotive')
, Controller = locomotive.Controller;


var nC3 = new Note('C',3);
console.log(nC3.getFullName());

var songsController = new Controller();

songsController.getKey = function() {

  this.title = 'Locomotive';
  this.chordList = null;
  this.key = null;
  this.myError = null;

  var chordString = this.param('chord');
  if(chordString != null){

    var chordArray = chordString.split(',');

    this.chordList = chordString;
    console.log('chordList = ' + this.param('chord'));

    this.keyCompatArray = SongService.getKey(chordArray);
    
  }
  this.render();
};

songsController.analyze = function() {
  console.log('in songs#analyze');
  
  //output for view
  this.introOut = null;
  this.verseOut = null;
  this.prechorusOut = null;
  this.chorusOut = null;
  this.soloOut = null;
  this.bridgeOut = null;
  this.outroOut = null;
  
  //String input
  var intro = this.introIn = this.param('intro');
  var verse = this.verseIn = this.param('verse');
  var prechorus = this.prechorusIn = this.param('prechorus');
  var chorus = this.chorusIn = this.param('chorus');
  var solo = this.soloIn = this.param('solo');
  var bridge = this.bridgeIn = this.param('bridge');
  var outro = this.outroIn = this.param('outro');
  
  //whole song
  var chordArray = [];
  
  //Array object for each section
  var introArray = [];
  var verseArray = [];
  var prechorusArray = [];
  var chorusArray = [];
  var soloArray = [];
  var bridgeArray = [];
  var outroArray = [];
  
  //split string to array of each section and add them to chordArray
  
  pushToItsOwnArray(intro, introArray);
  pushToItsOwnArray(verse, verseArray);
  pushToItsOwnArray(prechorus, prechorusArray);
  pushToItsOwnArray(chorus, chorusArray);
  pushToItsOwnArray(solo, soloArray);
  pushToItsOwnArray(bridge, bridgeArray);
  pushToItsOwnArray(outro, outroArray);
  
  if(introArray !== null)
    chordArray = chordArray.concat(introArray);
  if(verseArray !== null)
    chordArray = chordArray.concat(verseArray);
  if(prechorusArray !== null)
    chordArray = chordArray.concat(prechorusArray);
  if(chorusArray !== null)
    chordArray = chordArray.concat(chorusArray);
  if(soloArray !== null)
    chordArray = chordArray.concat(soloArray);
  if(bridgeArray !== null)
    chordArray = chordArray.concat(bridgeArray);
  if(outroArray !== null)
    chordArray = chordArray.concat(outroArray);
  
  var key = SongService.getKey(chordArray)[0].key;
  
  console.log('key=' + key);
  
  introArray = weCameAsRoman( introArray, key);
  verseArray = weCameAsRoman( verseArray, key);
  prechorusArray = weCameAsRoman( prechorusArray, key);
  chorusArray = weCameAsRoman( chorusArray, key);
  soloArray = weCameAsRoman( soloArray, key);
  bridgeArray = weCameAsRoman( bridgeArray, key);
  outroArray = weCameAsRoman( outroArray, key);
  
  this.introOut = introArray.toString();
  this.verseOut = verseArray.toString();
  this.prechorusOut = prechorusArray.toString();
  this.chorusOut = chorusArray.toString();
  this.soloOut = soloArray.toString();
  this.bridgeOut = bridgeArray.toString();
  this.outroOut = outroArray.toString();
  
  var chordProgTree = new ChordProgTree();
  chordProgTree.getTree("./app/controllers/chordprog.properties",this, render);

  function render(tree,context){
    //console.log(tree.model);

    console.log(chordProgTree.getValue('I.V.X'));

    var walkOption = {strategy : 'pre'};
    var i = 0;

    var childrenNodeArray = tree.model.children;
    console.log('1st' + childrenNodeArray);
    var childrenArray = childrenNodeArray.map(function(element){return element.name});
    var matchedArray = [];
    var matchedNode;

    yoyo(tree.model,0);

    function yoyo(node, index){
      //console.log(node);
      if( node.children ) {
        childrenNodeArray = node.children;
        //console.log(childrenNodeArray);
        childrenArray = childrenNodeArray.map(function (element) {
          return element.name;
        });

        if (childrenArray.indexOf(introArray[index]) > -1) {
          console.log('found at index' + childrenArray.indexOf(introArray[index]));
          matchedArray.push(introArray[index]);

          matchedNode = childrenNodeArray[childrenArray.indexOf(introArray[index])];

          yoyo(matchedNode, index + 1)

        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    console.log(matchedArray);
    console.log();

    context.render();

  }
  //console.log(chordProgTree.model);
    
};

function pushToItsOwnArray(input, array){
  if(typeof input != 'undefined' && input.trim() !== '' ){
    input.split(',').forEach(function pushToArray(element){
      array.push(element.trim());
    });
  }
}

function weCameAsRoman(array,key) {
  if ( array.length !== 0 ){
    array = array.map( function(element){
      return SongService.getChord(element).getRoman(key);
    });
    return array;
  }
  return [];
}

function arraysAreIdentical(arr1, arr2){
  if (arr1.length !== arr2.length) return false;
  for (var i = 0, len = arr1.length; i < len; i++){
    if (arr1[i] !== arr2[i]){
      return false;
    }
  }
  return true;
}

module.exports = songsController;
