'use strict';

var express = require('express');
var router = express.Router();
module.exports = router;

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan
//instanciamos el modelo
const todos = require('../models/todos');

//creamos la ruta para obtener todos los usuarios
router.get('/users', function(req, res, next) {
  res.send(todos.listPeople());
});

//creamos la ruta para obtener las tareas de un usuario
router.get('/users/:name/tasks', function(req, res, next) {
  res.send(todos.list(req.params.name));
});

//creamos la ruta para pedir solo las tareas completas
router.get('/users/:name/tasks', function(req, res, next) {
    //traemos el query
    const query = req.query;
    //si el query es complete
    //accedemos a la propiedad status ya que es un objeto y siepre devuelve true
    if(!query.status) res.send(todos.list(req.params.name));
    if(query.status === 'complete') {
        //filtramos las tareas completas
        const complete = todos.list(req.params.name).filter(task => task.complete === true);
        res.send(complete);
    }else{
        //si no es complete devolvemos todas las tareas
        const complete = todos.list(req.params.name).filter(task => task.complete === false);
        res.send(complete);
    }
});

//creamos la ruta para cambiar el estado de una tarea (put = update)
router.put('/users/:name/tasks/:id', function(req, res, next) {
    //obtenemos los parametros
    const name = req.params.name;
    const id = req.params.id;
    //completamos la tarea de ese usuario
    res.send(todos.complete(name, id));
});

//creamos la ruta para eliminar una tarea
router.delete('/users/:name/tasks/:id', function(req, res, next) {
    //obtenemos los parametros
    const name = req.params.name;
    const id = req.params.id;
    //eliminamos la tarea de ese usuario
    res.status(204).send(todos.remove(name, id));
});

//creamos la ruta para crear una nueva tarea para un usuario
router.post('/users/:name/tasks', function(req, res, next) {
    //el req.body es la info que nos manda el cliente
  res.status(201).send(todos.add(req.params.name, req.body));
});

