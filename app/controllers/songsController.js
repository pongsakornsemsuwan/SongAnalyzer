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

  var context = this;

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

  var chordProgTree = new ChordProgTree("./app/controllers/chordprog.properties");
  chordProgTree.loadProperties("./app/controllers/chordprog.properties", render);

  function render(){
    //console.log(tree.model);

    var tree = chordProgTree.getTree();
    console.log(tree);

    var startIndex = 0;
    while(startIndex < introArray.length ){
      console.log(startIndex);
      var matchedArray = findLongestMatch(tree.model,introArray, startIndex);

      //if not match at all, move to next chord.
      if( matchedArray.length === 0 ){
        startIndex++;
      }else{
        while(typeof chordProgTree.getValue(matchedArray.toString().replace( /,/g, '.')) === 'undefined'){
          matchedArray.splice(matchedArray.length-1,1);
        }

        startIndex += matchedArray.length;

        console.log(matchedArray + ' match with' + chordProgTree.getValue(matchedArray.toString().replace( /,/g,'.')));
      }

    }

    context.render();

  }
  //console.log(chordProgTree.model);
    
};


function findLongestMatch(node, sourceArray, index){
  //console.log(node);
  var matchedArray = [];

  if( node.children ) {
    childrenNodeArray = node.children;
    //console.log(childrenNodeArray);
    childrenArray = childrenNodeArray.map(function (element) {
      return element.name;
    });

    if (childrenArray.indexOf(sourceArray[index]) > -1) {
      console.log('found at index' + childrenArray.indexOf(sourceArray[index]));
      matchedArray.push(sourceArray[index]);

      matchedNode = childrenNodeArray[childrenArray.indexOf(sourceArray[index])];

      return matchedArray.concat( findLongestMatch(matchedNode, sourceArray, index + 1) );

    } else {
      console.log('no match');
      return [];
    }
  } else {
    return [];
  }
}


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

module.exports = songsController;
