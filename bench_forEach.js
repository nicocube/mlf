'use strict'
 
var mlf = require(__dirname+'/lib/mlf.js')

var a = [1, 42, 3, 5, 9, 70]
  , b = mlf(a)

exports.compare = {
  "mlf forEach" : function () {
    var c = 0
    mlf(a).forEach(function() { c+=1 })
  },
  "mlf cached forEach" : function () {
    var c = 0
    b.forEach(function() { c+=1 })
  },
  "vanilla forEach" : function () {
    var c = 0
    a.forEach(function() { c+=1 })
  }
}

require("bench").runMain()