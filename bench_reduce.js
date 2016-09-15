'use strict'
 
var mlf = require(__dirname+'/lib/mlf.js')

var a = [1, 42, 3, 5, 9, 70]
  , b = mlf(a)

exports.compare = {
  "mlf reduce" : function () {
    mlf(a).reduce(function(a,b) {return a+b})
  },
  "mlf cached reduce" : function () {
    b.reduce(function(a,b) {return a+b})
  },
  "vanilla reduce" : function () {
    a.reduce(function(a,b) {return a+b})
  }
}

require("bench").runMain()