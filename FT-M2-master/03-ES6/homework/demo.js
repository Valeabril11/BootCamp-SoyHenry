// ARROW FUNCTIONS
// hay un return implicito

let plantas = ['dragona', 'hojaGrande', 'corazón']

let vale = plantas.map(function(elemento){
    return elemento.concat('    las riega Vale');
})

let quien = plantas.map((elemento) => elemento.concat(' quien las riega es Vale'))

console.log(vale);
console.log(quien);