/*
 * Copyright 2014 Nicolas Lochet Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *      
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

module.exports = (function () {
    'use strict'
    
    function mlf(_) { if (! (this instanceof mlf)) return new mlf(_); this._ = _ }
    function wrk(_) {if (! (this instanceof wrk)) return new wrk(_); this._ = _; this.fs = [] }
    
    function buildWorkable(T) { return function() { var w = wrk(this._); return w[T].apply(w, arguments) } }
    function buildChainable(T) { return function(f, t) { f = arguments.length > 1 ? f.bind(t): f; f._mlf_type = T; this.fs.push(f); return this } }
    
    ;['map', 'filter', 'slice'].forEach(function(k) { mlf.prototype[k] = buildWorkable(k) })
    ;['map', 'filter'].forEach(function(k) { wrk.prototype[k] = buildChainable(k) })
    wrk.prototype.slice = function(b, e) { this.fs.push({ _mlf_type: 'slice', b: b, e: e }); return this }

    wrk.prototype.forEach = function(g, t) {
        g = typeof t === 'undefined' ? g.bind(t) : g
        var _ = this._, fs = this.fs, i = 0, h = 0, l = _.length, m = fs.length
        elem:
        for (; i < l ; i+=1) {
            var $ = _[i], j = 0;
            for (; j < m ; j+=1) {
                var f = fs[j]
                switch(f._mlf_type){
                    case 'map':
                        $ = f($,i)
                    break
                    case 'filter':
                        if(!f($,i)) continue elem
                    break
                    case 'slice':
                        if (h < f.b) {
                            h += 1
                            continue elem
                        } else {
                            if (h === f.b) {
                                h = 0
                                if (typeof f.e !== 'undefined') {
                                    f.e = f.e - f.b - 1
                                }
                                f.b = 0
                            }
                            if (typeof f.e !== 'undefined' && h > f.e) break elem
                        }
                    break
                }
            }
            if (g($,h) === false) break
            h += 1
        }
    }
    wrk.prototype.get = function() { var r = []; this.forEach(function(e) { r.push(e) }); return r }
    
    wrk.prototype.reduce = function(f, p) {
        var _ = this._ 
        p = arguments.length > 1 ? p : _[0];
        this.slice(arguments.length > 1 ? 0 : 1).forEach(function(e, i) {
           p = f(p ,e ,i , _)
        })
        return p
    }
        
    mlf.prototype.forEach = function(f, t) { var w = wrk(this._); w.forEach(f,t) }
    mlf.prototype.reduce = function(f, p) { var w = wrk(this._); if (arguments.length > 1) { return w.reduce(f,p) } else { return w.reduce(f) } }
    
        
    mlf.prototype.reduceRight = function(f, p) { var _ = this._, i = arguments.length > 1 ? _.length - 1 : _.length - 2; p = arguments.length > 1 ? p : _[_.length-1]; for (; i >= 0 ; i-=1) { p = f(p ,_[i] ,i , _) }; return p }
    mlf.prototype.join = function(s) { s = s||','; return this.reduce(function(p,c,i) { return p + (i === 0 ? s: '')+c },'') }
    mlf.prototype.every = function(f,t) { var g = f.bind(t), r = true; this.forEach(function(e) { if (!g(e)) { r = false; return false} }); return r } 
    mlf.prototype.some = function(f,t) { var g = f.bind(t), r = false; this.forEach(function(e) { if (g(e)) { r = true; return false} }); return r }
        
    return mlf
})()
