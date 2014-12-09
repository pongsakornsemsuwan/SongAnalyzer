Note = require("../model/note.js");
Chord = require("../model/chord.js");

var locomotive = require('locomotive')
  , Controller = locomotive.Controller;


var nC3 = new Note("C",3);
console.log(nC3.getFullName());

var allKey = ["C","G","D","A","E","B","F#","F","Bb","Eb","Ab","Db"];

var keyMap = new Map();
keyMap.set("C",["C","D","E","F","G","A","B"]);
keyMap.set("G",["C","D","E","F#","G","A","B"]);
keyMap.set("D",["C#","D","E","F#","G","A","B"]);
keyMap.set("A",["C#","D","E","F#","G#","A","B"]);
keyMap.set("E",["C#","D#","E","F#","G#","A","B"]);
keyMap.set("B",["C#","D#","E","F#","G#","A#","B"]);
keyMap.set("F#",["C#","D#","F","F#","G#","A#","B"]);


keyMap.set("F",["C","D","E","F","G","A","A#"]);
keyMap.set("Bb",["C","D","D#","F","G","A","A#"]);
keyMap.set("Eb",["C","D","D#","F","G","G#","A#"]);
keyMap.set("Ab",["C","D#","D#","F","G","G#","A#"]);
keyMap.set("Db",["C","D#","D#","F","F#","G#","A#"]);





var chordMap = new Map();
chordMap.set("C", new Chord("C", ["C","E","G"]));
chordMap.set("Cmaj7",new Chord("Cmaj7", ["C","E","G","B"]));
chordMap.set("C7", new Chord("C7", ["C","E","G","A#"]));
chordMap.set("Cm", new Chord("Cm", ["C","D#","G"]));
chordMap.set("Cm7", new Chord("Cm7", ["C","D#","G","A#"]));

chordMap.set("D", new Chord("D", ["D","F#","A"]));
chordMap.set("Dmaj7", new Chord("Dmaj7", ["D","F#","A","C#"]));
chordMap.set("D7", new Chord("D7", ["D","F#","A","C"]));
chordMap.set("Dm", new Chord("Dm", ["D","F","A"]));
chordMap.set("Dm7", new Chord("Dm7", ["D","F","A","C"]));

chordMap.set("E", new Chord("E", ["E","G#","B"]));
chordMap.set("Emaj7", new Chord("Emaj7", ["E","G#","B","D#"]));
chordMap.set("E7", new Chord("E7", ["E","G#","B","D"]));
chordMap.set("Em", new Chord("Em", ["E","G","B"]));
chordMap.set("Em7", new Chord("Em7", ["E","G","B","D"]));

chordMap.set("F", new Chord("F", ["F","A","C"]));
chordMap.set("Fmaj7", new Chord("Fmaj7", ["F","A","C","E"]));
chordMap.set("F7", new Chord("F7", ["F","A","C","D#"]));
chordMap.set("Fm", new Chord("Fm", ["F","G#","C"]));
chordMap.set("Fm7", new Chord("Fm7", ["F","G#","C","D#"]));

chordMap.set("G", new Chord("G", ["G","B","D"]));
chordMap.set("Gmaj7", new Chord("Gmaj7", ["G","B","D","F#"]));
chordMap.set("G7", new Chord("G7", ["G","B","D","F"]));
chordMap.set("Gm", new Chord("Gm", ["G","A#","D"]));
chordMap.set("Gm7", new Chord("Gm7", ["G","A#","D","F"]));

chordMap.set("A", new Chord("A", ["A","C#","E"]));
chordMap.set("Amaj7", new Chord("Amaj7", ["A","C#","E","G#"]));
chordMap.set("A7", new Chord("A7", ["A","C#","E","G"]));
chordMap.set("Am", new Chord("Am", ["A","C","E"]));
chordMap.set("Am7", new Chord("Am7", ["A","C","E","G"]));

chordMap.set("B", new Chord("B", ["B","D#","F#"]));
chordMap.set("Bmaj7", new Chord("Bmaj7", ["B","D#","F#","A#"]));
chordMap.set("B7", new Chord("B7", ["B","D#","F#","A"]));
chordMap.set("Bm", new Chord("Bm", ["B","D","F#"]));
chordMap.set("Bm7", new Chord("Bm7", ["B","D","F#","A"]));

chordMap.set("C#", new Chord("C#", ["C#","F","G#"]));
chordMap.set("C#maj7", new Chord("C#maj7", ["C#","F","G#","C"]));
chordMap.set("C#7", new Chord("C#7", ["C#","F","G#","B"]));
chordMap.set("C#m", new Chord("C#m", ["C#","E","G#"]));
chordMap.set("C#m7", new Chord("C#m7", ["C#","E","G#","B"]));

chordMap.set("D#", new Chord("D#", ["D#","G","A#"]));
chordMap.set("D#maj7", new Chord("D#maj7", ["D#","G","A#","D"]));
chordMap.set("D#7", new Chord("D#7", ["D#","G","A#","C#"]));
chordMap.set("D#m", new Chord("D#m", ["D#","F#","A#"]));
chordMap.set("D#m7", new Chord("D#m7", ["D#","F#","A#","C#"]));

//ACTUALLY F
chordMap.set("E#", new Chord("E#", ["F","A","C"]));
chordMap.set("E#maj7", new Chord("E#maj7", ["F","A","C","E"]));
chordMap.set("E#7", new Chord("E#7", ["F","A","C","D#"]));
chordMap.set("E#m", new Chord("E#m", ["F","G#","C"]));
chordMap.set("E#m7", new Chord("E#m7", ["F","G#","C","D#"]));

chordMap.set("F#", new Chord("F#", ["F#","A#","C#"]));
chordMap.set("F#maj7", new Chord("F#maj7", ["F#","A#","C#","F"]));
chordMap.set("F#7", new Chord("F#7", ["F#","A#","C#","E"]));
chordMap.set("F#m", new Chord("F#m", ["F#","A","C#"]));
chordMap.set("F#m7", new Chord("F#m7", ["F#","A","C#","E"]));

chordMap.set("G#", new Chord("G#", ["G#","C","D#"]));
chordMap.set("G#maj7", new Chord("G#maj7", ["G#","C","D#","G"]));
chordMap.set("G#7", new Chord("G#7", ["G#","C","D#","F#"]));
chordMap.set("G#m", new Chord("G#m", ["G#","B","D#"]));
chordMap.set("G#m7", new Chord("G#m7", ["G#","B","D#","F#"]));

chordMap.set("A#", new Chord("A#", ["A#","D","F"]));
chordMap.set("A#maj7", new Chord("A#maj7", ["A#","D","F","A"]));
chordMap.set("A#7", new Chord("A#7", ["A#","D","F","G#"]));
chordMap.set("A#m", new Chord("A#m", ["A#","C#","F"]));
chordMap.set("A#m7", new Chord("A#m7", ["A#","C#","F","G#"]));

//ACTUALLY C
chordMap.set("B#", new Chord("B#", ["C","E","G"]));
chordMap.set("B#maj7", new Chord("B#maj7", ["C","E","G","B"]));
chordMap.set("B#7", new Chord("B#7", ["C","E","G","A#"]));
chordMap.set("B#m", new Chord("B#m", ["C","D#","G"]));
chordMap.set("B#m7", new Chord("B#m7", ["C","D#","G","A#"]));

var keyCPoint = 0;
var keyGPoint = 0;
var keyDPoint = 0;
var keyAPoint = 0;
var keyEPoint = 0;


var notesPool = [];

var songsController = new Controller();

songsController.getKey = function() {
  this.title = 'Locomotive';
  this.chordList = null;
  this.key = null;

  var chordString = this.param('chord');
  if(chordString != null){
	
    var chordArray = chordString.split(',');

    this.chordList = chordString;
    console.log('chordList = ' + this.param('chord'));

    resetPoint();
    chordArray.map( breakTheChord );

    console.log("keyCRest=" + keyCPoint );

    allKey.forEach(function(key){
      notesPool.forEach( function(element,index,array){
        calculatePoints(element, key);
      }) ;
    });
    console.log("C point : " + keyCPoint)
    console.log("G point : " + keyGPoint)
    console.log("D point : " + keyDPoint)
    console.log("A point : " + keyAPoint)
    console.log("E point : " + keyEPoint)

    var pointSet = new Set();
    pointSet.add(keyCPoint);
    pointSet.add(keyGPoint);
    pointSet.add(keyDPoint);
    pointSet.add(keyAPoint);
    pointSet.add(keyEPoint);

    //var maxX = Math.max(keyCPoint,keyGPoint,keyDPoint,keyAPoint,keyEPoint);
    // var maxX = Math.max();
    // var index = [keyCPoint,keyGPoint,keyDPoint,keyAPoint,keyEPoint].indexOf(maxX);

    var pointArray = [keyCPoint,keyGPoint,keyDPoint,keyAPoint,keyEPoint];
    var sortedPointArray = [keyCPoint,keyGPoint,keyDPoint,keyAPoint,keyEPoint];
    sortedPointArray.sort(function(a, b){return b-a});

    var max = sortedPointArray[0];
    var index = pointArray.indexOf(max);
    pointArray[index] = 0;
    switch(index){
      case 0: this.key1="C"; this.compat1=Number(keyCPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 1: this.key1="G"; this.compat1=Number(keyGPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 2: this.key1="D"; this.compat1=Number(keyDPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 3: this.key1="A"; this.compat1=Number(keyAPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 4: this.key1="E"; this.compat1=Number(keyEPoint/notesPool.length*100).toFixed(2) + "%"; break;
      default:this.key1="Other";
    }

    max = sortedPointArray[1];
    var index2 = pointArray.indexOf(max);
    pointArray[index2] = 0;
    switch(index2){
      case 0: this.key2="C"; this.compat2=Number(keyCPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 1: this.key2="G"; this.compat2=Number(keyGPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 2: this.key2="D"; this.compat2=Number(keyDPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 3: this.key2="A"; this.compat2=Number(keyAPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 4: this.key2="E"; this.compat2=Number(keyEPoint/notesPool.length*100).toFixed(2) + "%"; break;
      default:this.key2="Other";
    }

    max = sortedPointArray[2];
    var index3 = pointArray.indexOf(max);
    // for(var i=2;index3==index||index3==index2;i++)
    // {
    //   max = sortedPointArray[i];
    //   index3 = pointArray.indexOf(max);
    // }
    switch(index3){
      case 0: this.key3="C"; this.compat3=Number(keyCPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 1: this.key3="G"; this.compat3=Number(keyGPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 2: this.key3="D"; this.compat3=Number(keyDPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 3: this.key3="A"; this.compat3=Number(keyAPoint/notesPool.length*100).toFixed(2) + "%"; break;
      case 4: this.key3="E"; this.compat3=Number(keyEPoint/notesPool.length*100).toFixed(2) + "%"; break;
      default:this.key3="Other";
    }

    console.log("C Compatibility : " + keyCPoint/notesPool.length*100 + "%");
    console.log("G Compatibility : " + keyGPoint/notesPool.length*100 + "%");
    console.log("D Compatibility : " + keyDPoint/notesPool.length*100 + "%");
    console.log("A Compatibility : " + keyAPoint/notesPool.length*100 + "%");
    console.log("E Compatibility : " + keyEPoint/notesPool.length*100 + "%");

  }
  this.render();
}

function resetPoint(){
  notesPool = [];
  keyCPoint = 0;
  keyGPoint = 0;
  keyDPoint = 0;
  keyAPoint = 0;
  keyEPoint = 0;
}
function breakTheChord (chord){
	
  console.log("processing chord " + chord + ",break to " + chordMap.get(chord));
  var tmpChord = chordMap.get(chord);
  tmpChord.getNotes().forEach(function(element,index,array){
    notesPool.push(element);
  })
}

function calculatePoints (element, key) {
  var tmpKey = keyMap.get(key);
  if(tmpKey.indexOf(element) > -1){
    if(key == "C"){
      console.log(keyCPoint);
      keyCPoint++;
    }
    if(key == "G"){
      keyGPoint++;
    }
    if(key == "D"){
      keyDPoint++;
    }
    if(key == "A"){
      keyAPoint++;
    }
    if(key == "E"){
      keyEPoint++;
    }
  }
}

module.exports = songsController;
