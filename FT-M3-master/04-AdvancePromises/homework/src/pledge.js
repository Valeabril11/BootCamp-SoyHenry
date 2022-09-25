'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
    
    if (typeof executor !== 'function') throw new TypeError('no es funcion executor function')
    this._state = 'pending';
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (coso) {
    if (this._state === 'pending') {
        this._state = 'fulfilled'
        this._value = coso;
    }
}
$Promise.prototype._internalReject = function (cosito) {
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = cosito;
    }
    // a confirrrr**********************
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
