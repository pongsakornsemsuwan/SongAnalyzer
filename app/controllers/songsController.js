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

  //String input
  //var intro = this.introIn = this.param('intro');
  var intro = this.introIn = this.getParam(this, 'intro', '');
  var verse = this.verseIn = this.getParam(this, 'verse', '');
  var prechorus = this.prechorusIn = this.getParam(this, 'prechorus', '');
  var chorus = this.chorusIn = this.getParam(this, 'chorus', '');
  var solo = this.soloIn = this.getParam(this, 'solo', '');
  var bridge = this.bridgeIn = this.getParam(this, 'bridge', '');
  var outro = this.outroIn = this.getParam(this, 'outro', '');
  
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

    context.introOut = createProgressionChunk(introArray, chordProgTree);
    context.verseOut = createProgressionChunk(verseArray, chordProgTree);
    context.prechorusOut = createProgressionChunk(prechorusArray, chordProgTree);
    context.chorusOut = createProgressionChunk(chorusArray, chordProgTree);
    context.soloOut = createProgressionChunk(soloArray, chordProgTree);
    context.bridgeOut = createProgressionChunk(bridgeArray, chordProgTree);
    context.outroOut = createProgressionChunk(outroArray, chordProgTree);

    console.log('====introMap====');

    for(var k in context.introOut){

      console.log('k=' + k + ':' + context.introOut[k].name + ':' + context.introOut[k].description);

    }
    console.log('====verseMap====');
    for(var k in context.verseOut){

      console.log('k=' + k + ':' + context.verseOut[k].name + ',' + context.verseOut[k].description);
    }

    context.render();
  }
};


function findLongestMatch(node, sourceArray, index){
  console.log(node);
  var matchedArray = [];

  if( node.children ) {
    var childrenNodeArray = node.children;
    console.log(childrenNodeArray);
    var childrenArray = childrenNodeArray.map(function (element) {
      return element.name;
    });

    if (childrenArray.indexOf(sourceArray[index]) > -1) {
      console.log('found at index' + childrenArray.indexOf(sourceArray[index]));
      matchedArray.push(sourceArray[index]);

      var matchedNode = childrenNodeArray[childrenArray.indexOf(sourceArray[index])];

      console.log('here');
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
  console.log('input' + input);
  if(input!==null && input.trim() !== '' ){
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

songsController.getParam = function( context, param, def){
  console.log('param' + context.param(param));
  if(typeof context.param( param ) !== 'undefined'){
    return context.param( param );
  }else{
    return def;
  }
};

function createProgressionChunk(sourceArray, chordProgTree) {

  var tree = chordProgTree.getTree();

  var chordProgMap = [];
  var startIndex = 0;
  var outputIndex = 0;

  while (startIndex < sourceArray.length) {

    console.log(startIndex);
    var matchedArray = findLongestMatch(tree.model, sourceArray, startIndex);
    console.log('yoyo' + matchedArray);
    //if not match at all, move to next chord.
    if (matchedArray.length === 0) {
      console.log(sourceArray[startIndex] + ' not match');
      chordProgMap[outputIndex] = {name:sourceArray[startIndex],description:''};
      //chordProgMap[sourceArray[startIndex]] = '';
      outputIndex++;
      startIndex++;

    } else {
      while (typeof chordProgTree.getValue(matchedArray.toString().replace(/,/g, '.')) === 'undefined' && matchedArray.length > 0 ) {
        console.log(matchedArray.length);
        matchedArray.splice(matchedArray.length - 1, 1);
      }

      if( matchedArray.length === 0){
        chordProgMap[outputIndex] = {name:sourceArray[startIndex],description:''};
        //chordProgMap[sourceArray[startIndex]] = '';
        startIndex++;
        outputIndex++;
      } else {

        var chordProgDesc = chordProgTree.getValue(matchedArray.toString().replace(/,/g, '.'));
        console.log(matchedArray + ' match with' + chordProgDesc);

        var myString = matchedArray.toString();

        chordProgMap[outputIndex] = {name: myString, description: chordProgDesc};

        startIndex += matchedArray.length;
        outputIndex++;
      }
    }
  }

  return chordProgMap;
}

module.exports = songsController;
