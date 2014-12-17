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
}

songsController.analyze = function() {
  console.log('in songs#analyze')
  
  //output for view
  this.introOut = null;
  this.verseOut = null;
  this.prechorusOut = null;
  this.chorusOut = null;
  this.soloOut = null;
  this.bridgeOut = null;
  this.outroOut = null;
  
  //output for view
  this.introIn = '';
  this.verseIn = '';
  this.prechorusIn = '';
  this.chorusIn = '';
  this.soloIn = '';
  this.bridgeIn = '';
  this.outroIn = '';
  
  //String input
  var intro = this.param('intro');
  var verse = this.param('verse');
  var prechorus = this.param('prechorus');
  var chorus = this.param('chorus');
  var solo = this.param('solo');
  var bridge = this.param('bridge');
  var outro = this.param('outro');
  
  //whole song
  var chordArray = new Array();
  
  //Array object for each section
  var introArray = new Array();
  var verseArray = new Array();
  var prechorusArray = new Array();
  var chorusArray = new Array();
  var soloArray = new Array();
  var bridgeArray = new Array();
  var outroArray = new Array();
  
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
  
  var introOut;
  
  console.log('key=' + key);
  
  introArray = weCameAsRoman( introArray, key);
  verseArray = weCameAsRoman( verseArray, key);
  prechorusArray = weCameAsRoman( prechorusArray, key);
  chorusArray = weCameAsRoman( chorusArray, key);
  soloArray = weCameAsRoman( soloArray, key);
  bridgeArray = weCameAsRoman( bridgeArray, key);
  outroArray = weCameAsRoman( outroArray, key);
  
  console.log(introArray);
  
  this.introOut = introArray.toString();
  this.verseOut = verseArray.toString();
  this.prechorusOut = prechorusArray.toString();
  this.chorusOut = chorusArray.toString();
  this.soloOut = soloArray.toString();
  this.bridgeOut = bridgeArray.toString();
  this.outroOut = outroArray.toString();
  
  var chordProgTree = new ChordProgTree();
  chordProgTree.getTree("./app/controllers/chordprog.properties", this, render);

  function render(tree,context){
    console.log(tree.model);
    context.render();
  }
  //console.log(chordProgTree.model);
    
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
      console.log('elementtttttttt' + element);
      console.log(SongService.getChord(element).getRoman(key));
      return SongService.getChord(element).getRoman(key);
    });
    return array;
  }
  return new Array();
}


function convertToRoman(chord, key){
  console.log(key);
  SongService.getChord(chord).getRoman(key);
  return SongService.getChord(chord).getRoman(key);
}

module.exports = songsController;
