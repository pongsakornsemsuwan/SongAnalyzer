var locomotive = require('locomotive')
, Controller = locomotive.Controller;

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'Locomotive';
  this.render();
}

pagesController.main2 = function() {
  this.render();
}

module.exports = pagesController;
