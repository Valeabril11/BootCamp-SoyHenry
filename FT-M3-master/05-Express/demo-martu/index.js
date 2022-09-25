var express = require('express');
var app = express(); // lo inicializamos
var caramelos = 10
//para usar middleWares existentes -->>
var midd = require('morgan')
// configuramos CORS PARA QUE PODAMOS RECIBIR INFORMACION DE DIFERENTES DOMINIOS 

var routes = require('./routes.js') // y defino el middleWare 

//-----------------------------------------
// ****--------MiddleWares (EL ORDEN DE LOS MIDDLEWARES IMPORTAN), para definirlos y establecerlos uso el.  **LOS MIDDLEWARES** Son funciones que reciben un (req, res y next)

app.use('/about', routes); // aca le estoy diciendo que todo lo que empiece con /about, lo complete con routes y routes es mi otro modulo router.js, probá con http://localhost:3000/about/valeria ó un id (cualqiuer cosa) o un /about solo

app.use(express.json()); // este es para poder utilizar el -->> post de mas abajo (linea 84)
app.use('/', function(req, res, next){ // quiero que hagas una accion ante cada uno de estos elementos
console.log('Hicieron un Request a' + req.url);
next();
}); // primero hace esto request -> middleWare -> next() -> y ahora va a buscar la rruta que le corresponde -->>

app.use('/', function(req, res, next){ // quiero agregar un middleWare
    console.log('Hola soy otro middleWare, podes poner cuantos quieras :D');
    next();
    });
// ---- USO MORGAN, que es un middleWare-->>

app.use(midd('dev')); // aca le estoy diciendo que para cada request invoque a midd con la especificacion de dev, la explicacion de lo que hace dev esta en la documentacion de morgan, en este caso es una funcion que muestra todo lo que haga y luego sigue, ya tiene el next

//*******-------FIN MIDDLEWARES------*********/
//---------------------------------------------------------

// req.url === '/' -> content-type, res.end
app.get('/', function (req, res, next) {
    // el next no es obligatorio
    res.send('Hello!') //ya le estoy mandando esta info, esto siempre me va a estar mandando un status de 200, si lo quiero cambiar dedebo llamar al res.status(code)

});
app.get('/home', function (req, res, next) {

    next(); // el next "pasa la pelota"
});
app.get('/home', function (req, res, next) {
    //if (caramelos = 10) return res.send('10') // coloco el return para que corte la ejecucion y me muestre 10 y no el string de abajo->
    res.send('Si! estas en la Home 2! :D')
});
//ahora yo quiero empezar a mandar info por url o matchear con  algo que yo le envíe para esto uso 'ab?cd' el signo de pregunta, el elemento que antecede al signo ? puede o no pertenecer a la ruta en este caso accedo a a/acd ó /abcd, en ambos casos voya  estar devolviendo lo que yo le ponga en el res.send para que 2 rutas vayan a parar al mismo lugar // el elemento que antecede al * debe aparecer minimo 1 vez y puede aparecer tantas veces como quiera el usuario, por lo tanto en este caso si accedo a abbbcd o abbcd, en todos los casos voy a estar devolviendo abcd

app.get('/ab?cd', function (req, res) {
    res.send('ab?cd');
})

app.get('/ab*cd', function (req, res) {
    res.send('ab*cd');
})

app.get('/welcome/:name/:lastName', (req, res) => { // puedo usar funcion flecha y ahora lo que quiero hacer es /welcome/Valeria con los : estoy recibiendo un objeto, por lo tanto lo puedo recibir con destructuring, esto es envio de informacion por parametro, si queremos hacerlo tenemos que declararlo en la ruta
    // /welcome/Agustin, etc...
    console.log(req.params);
    //let name= req.params.name -> destructuring
    let { name, lastName } = req.params;
    //res.send('colgado');
    res.send(`Hola ${name} de apellido ${lastName}`) // aca coloco que me devuelva lo que recibo por parametro que es el name que yo vaya a colocar, esto lo puedo usar para r a buscar informacion con un id, para abrir el name last name ahora voy a localhost:3000/valeria/molina
});

    // ahora veamos otro tipo de envio de informacion (por parametros se usa muchisimo) ahora vemos por qery, la diferencia es que (sigo mandando info a traves de la URL), CUANDO TRABAJO POR QERY no ACLARO EN LA DEFINICION DE LA RUTA PORUQE POR QERY PUEDEN O NO MANDARME LA INFORMACION, EN EL CASO DE PARAMS DEBEN MANDARME LA INFO SI O SI PARA QUE MATCHEE LA RUTA por Qery ---->>

    app.get('/porquery', (req, res) => {
        let { name, lastname, age } = req.query; // como mando la info? por la url localhost:3000/porquery?name=valeria&lastname=molina&age=26
        if (name && lastname && age) {
            res.send(`${name} de apellido ${lastname} tiene ${age} años`)
        } else {
            res.send('info missing');
        }
    });

// y si mando algo que no coincide con nada?
app.get('*', (req, res)=>{
    res.send('error, no coincide con NADA');
})


//recibiendo informacion por post que envia informacion por body, como accedemos a ella?

app.post('/', (req, res)=>{
    console.log(req.body);
    let{name, lastname} =req.body
    console.log(name, lastname)
    res.send('done'); // para esto usamos un emulador de clientes, en este caso postman, nos permite probar otras rutas que no sean solo del tipo get -> lo instalamos // para esto utilizo el middleware --> app.use(express.json()); que lo que hace, es tomar lo que envio y convertirlo en un json


}) // es lo mismo que un put -->


app.listen(3000);