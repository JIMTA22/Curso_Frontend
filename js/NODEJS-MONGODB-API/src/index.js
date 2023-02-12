//Este es el achivo de entrada a nuetra aplicación.
// Lo primero que tenemos que hacer es iniciar desde la terminal un nuevo proyecto en node.js en la carpeta de nuestro proyecto. comando: npm init --yes 
// Esto nos creará dentro de la carpeta del proyecto el archivo 'package.json' con las configuraciones iniales y las dependencias de nuestra aplicación.
// El framework 'express' de node.js nos permite levantar un servidor WEB. Para instalar el módulo 'express' ejecutamos en la terminal el comando: npm i express, dentro de nuestro directorio del proyecto. Se instala como una dependencia de nuestra aplicación.
// Dentro de la carpeta del proyecto creamos una carpeta nueva llamada 'src' donde colocaremos el código de nuestra aplicación. Seguidamente, creamos el archivo 'index.js' que es donde colocaremos el código.
// Instalamos tambien el módulo 'nodemon' que nos facilita el trabajo durante el desarrollo de la aplicación ya que nos va a permitir reiniciar el servidor WEB automaticamnte cada vez que realizamoa cambios en nuestro código. Para su instalación, desde dentro de la carpeta de nuestro proyecto, ejecutamos desde la terminal el comando: npm i nodemon -D (-D: es porque unicamente lo vamos a instalar como una dependencia de desarrollo, esto quiere decir que nuestra aplicacion no necesita el módulo nodemon para funcionar, lo necesitamos únicamente durante la fase de desarrollo de nuestra aplicación).
// A continuación, definimos en el fichero 'package.json' el script para iniciar nuestra aplicación con nodemon:
//"scripts": {
//    "start": "nodemon src/index.js"
//  },
//Para conectar nuestra aplicación de servidor con la base de datos que hemos creado en MONGODB ATLAS, necesitmos instalar el módulo 'mongoose'. Este módulo nos facilita el trabajo de conectar nuestra apiclación con MONGODB ATLAS. Ejecutamos en la terminal desde nuestra carpeta del proyecto el comando: npm i mongoose
// Para poder crear varibles de entorno personalizadas, tenemos que instalar el módulo 'dotenv' para esto, ejecutamos desde la terminal en nuestra carpeta del proyecto el comando: npm i dotenv
// Las variables de entorno personalizadas las definiresmos en un fichero .env que vamos a crear en la raiz de nuestra carpeta del proyecto. Creamos la variable de entorno MONGODB_URI con la conexión a nuestra MONGODB ATLAS.

// Código del Servidor
// Para ejecuar nuestro servidor ejecuatmos el comando siguiente desde la termina:
// npm run start (star es el spript de definimos para iniciar nuestra aplicación.)

const express = require('express'); // solicitamos el módulo 'express'
const mongoose = require('mongoose'); // solicitamos el módulo 'mongoose'
require('dotenv').config(); //Solicitamos y ejecutamos el módulo 'dotenv'
const userRoutes = require('./routes/user'); // solicitamos las rutas para usuarios 
const path = require('path') // Solicitamos el módulo path para poder traer de manera automática la ruta de nuestro proyecto.

const app = express();

//definimos el puerto de nuestro servidor WEB. 
// 'process.env.PORT' variable de entorno propia de node.js por si desplegamos nuestra aplicación en un servicio de hosting.
const port = process.env.PORT || 9000;

//Usamos este funcion de middleware que viene del propio 'express' para transformar los datos en formato JSON que nos llegan del cuerpo de la petición (req.body) a un objeto de JavaScript.
app.use(express.json());
//Usamos esta funcion de middleware para añadirles el prefijo '/api' a todas la peticiones.
app.use("/api", userRoutes);

//routes (rutas)
// Definimos las rutas para nuestra aplicación. En el ejemplo, estamos definiendo la ruta principal '/' de nuestra API ó aplicación, la cual va ha recibir una función que recibe como parametros'req'(objeto de la petición) y 'res'(objeto de la respuesta) y nosotros vamos a responder a la petición usando el objeto de la respuesta 'res' con su metodo .send para responder.
// Es un ejemplo para comprobar que nuestro servidor está respondiendo a peticiones de algún cliente.
app.get('/',(req, res) => {
  //  res.send('<h1>Hola Mundo!!!</h1>');// usamos el objeto de la respuesta 'res' con su metodo .send para responder con un texto plano.
  res.sendFile(path.join(__dirname + "/index.html")) // SendFile nos permite enviar un archivo HTML. La constante '__dirname' contiene la ruta raiz de nuestro proyecto.
});

//mongodb connection
//usamos el objeto mongoose y su metodo .connect para conectarme con la DB.
//Le pasamos la variable de enterno que hemos definido con la conexión a nuestra DB.
// el metodo .connect nos puede enviar una promesa, la tratramos y si la conexión fue exitosa lo indicamos por la terminal, en caso contrario indicamos el número del errror por la terminal.
mongoose.set("strictQuery", true);
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('🚀 Connected to MongoDB Atlas'))
.catch ((error) => console.log(error));

// El servidor WEB se pone a la escucha en el puerto espeficicado e imprime un mensaje por la terminal indicado que está funcionando.
app.listen(port, () => console.log('🚀 Server listing on port', port));