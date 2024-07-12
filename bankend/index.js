'use strict'
var mongoose=require('mongoose');
var port='3600';

mongoose.promise=global.Promise;
mongoose.set("strictQuery",false); //para q no de error al iniciar
var app=require('./app'); //llamando a app.js 

//mongoose.connect('mongodb://localhost/cliente')
mongoose.connect('mongodb://127.0.0.1:27017/clientes')  //localhost=127.0.0.1
.then(()=>{
    console.log("Conexion establecido con la bdd que bien");
   app.listen(port,()=>{
       console.log("Conexion establecida en el url: localhost:3600");
    })

})
.catch(err=>console.log(err))

//Envio de correos
app1.listen(3000,()=>{
    console.log("Servidor en -> http://localhost:3000");
});