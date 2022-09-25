var traverseDomAndCollectElements = function (matchFunc, startEl) { // El startEL representa el primer elemento a evaluar, por ejemplo "empezá por el body"
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
// por ej.: startEL => <body></body>
if(matchFunc(startEl)){
  resultSet.push(startEl)
}
for (let i = 0; i<startEl.children.length; i++){
  let elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
  resultSet = [...resultSet, ...elements];
}
return resultSet;
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id (#selector), class(.selector), tag.class(div.selector), tag(div) 


var selectorTypeMatcher = function (selector) { //1 primero armo esta funcion
  // tu código aquí
  if (selector[0] === '#') return 'id'; // si en la posicion cero del string es un # returna que es un id
  if (selector[0] === '.') return 'class';
  if (selector.split('.').length === 2) return 'tag.class' // si despues de separar el string por el punto me quedan 2 elemtos significa que el punto esta en el medio y es un tag.class
  return 'tag' // por ultimo, si no es ninguna de las anteriores asumimos que es un tag.
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) { // matchFunctionMaker(#id)
  var selectorType = selectorTypeMatcher(selector); // aca voy a tener guardado el tipo de selector  id
  var matchFunction; // creo una variable que la retorno al final
  if (selectorType === "id") {
    matchFunction = function (el) {// recibe un elemnto del DOM y tiene que comparar si ese elemento coincide con el selector que me estan mandando y como debe retornar solo true o false coloco solo el return 
      //return '#' + el.id === selector;
      return `#${el.id}`=== selector;
    }
  } else if (selectorType === "class") { // <div class = 'container' 'hola' 'chau'> }
    
    
    matchFunction = function (el) {
      let classes = el.classList
      for (let i = 0; i < classes.length; i++) {
        if ('.' + classes[i] === selector) return true;
      }
      return false
    }
  }

  else if (selectorType === "tag.class") {
// MatchFunction = function (el) {
//       let array = selector.split('.');
//       if (el.tagName.toLoWerCase() === array[0]) {// paso todo a minusculas porque estoy comparando Div === div        
//         // for (let i = 0; i < el.classList.length; i++) {
//         //   if (el.classList[0] === array[1]) return true;
//         // }
// return true
//       }
//       return false
//     }
    matchFunction = function(el){
      let [tagBuscado,claseBuscada] = selector.split('.');
      return matchFunctionMaker(tagBuscado)(el) && matchFunctionMaker(`.${claseBuscada}`)(el);
    }

  } else if (selectorType === "tag") {
    matchFunction = function (el) {
      if(el.tagName.toLowerCase() === selector) return true
      return false
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector); // aca me queda guardada una de las funciones que hice mas arriba ===> function(el)
  elements = traverseDomAndCollectElements(selectorMatchFunc); // RECORRER EL DOM Y RECOLECTAR LOS ELEMENTOS
  return elements;
};
