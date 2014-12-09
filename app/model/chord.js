function Chord(name,notes){
  this.name=name;
  this.notes=notes;
}

Chord.prototype = {
  constructor:Chord,
  getNotes:function(){
    return this.notes;
  },
  getName:function(){
    return this.name;
  }
}

module.exports = Chord;
