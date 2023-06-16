// definimos las rutas o endpoints para datos de usuarios.
// Los endpoints o direcciones donde se envían las peticiones para crear, recuperar o eliminar datos de nuestra base de datos. 
// Los archivos de endpoints o rutas asociados a cada tipo de datos que tenemos en nuestra aplicación, los creamos en la carpeta 'routes'

const express = require("express"); // solicitamos el módulo 'express'
const userSchema = require('../models/user'); // Solicitamos el modelo de usuarios 

const router = express.Router(); // Creamos un enrutador para las rutas

// create user
// Crea un usuario (user) con la estructura de usuario y con los datos que estan llegando del cuerpo de la petición (req.body).
router.post('/users', (req, res) => {
    const user = userSchema(req.body); // Crea un user con los datos
    user
        .save() // intentamos guardar los datos en la DB y retorna una promesa.
        .then((data) => res.json(data)) //Si fue exitosa responde JSON con los datos.
        .catch((error) => res.json({ messge: error})) //Responde en caso de error con un JSON con el error.
});

//get all user
// Endpoint o ruta para obtener todos los usuarios de nuestra DB.
router.get("/users", (req, res) => {
    userSchema
        .find() 
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ messge: error })); 
});

//get a user
// Endpoint o ruta para obtener un usuario de nuestra DB con el id de la petición.
router.get("/users/:id", (req, res) => {
    const { id } = req.params;//extramenos el id del usuraio de los parametros de la petición.
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error }));
});

//update a user
// Endpoint o ruta para actualizar los datos de un usuario de nuestra DB con el id de la petición.
router.put("/users/:id", (req, res) => {
  const { id } = req.params; //extramenos el id del usuraio de los parametros de la petición.
  const { name, age, email } = req.body; //extramenos los nuevos datos del usuraio que vamos a actulizar del cuerpo de la petición.
  userSchema
    .updateOne({ _id: id }, { $set: {name, age, email} }) // le pasamos un objetos con el id del usuario que vamos a modificar y otro objeto con los nuevos datos que vamos a actualizar.
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error }));
});

//delete a user
// Endpoint o ruta para eliminar un usuario de nuestra DB con el id de la petición.
router.delete("/users/:id", (req, res) => {
  const { id } = req.params; //extramenos el id del usuraio de los parametros de la petición.
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ messge: error }));
});
 
 
module.exports = router; // exportamos el enrutador que hemos creado para poder usarlo en el archivo principal de la aplicación.