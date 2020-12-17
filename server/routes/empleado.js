const express = require('express');
const _ = require ('underscore');
const Empleado = require('../models/empleado');
const app = express();

app.get('/empleado', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 100;
    Empleado.find({ activo: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err,empleados) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al consultar los empleados',
                err
            });
        }
    
        res.json({
            ok:true,
            msg:'Lista de empleados obtenida con exito',
            conteo: empleados.length,
            empleados
        });
    });
  });

  app.post('/empleado', function(req, res){
    let body = req.body;
    let emp = new Empleado({
        id_usuario: body.id_usuario,
        id_departamento: body.id_departamento,
        nombre_del_puesto: body.nombre_del_puesto,
        anios_servicio: body.anios_servicio,
        hora_entrada: body.hora_entrada,
        hora_salida: body.hora_salida,
    }); 

    emp.save((err, empDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            empDB
        });
    });
  });

  app.put('/empleado/:id', function (req, res){
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre_del_puesto','anios_servicio','hora_entrada','hora_salida']);

    Empleado.findByIdAndUpdate(id , body , 
    { new:true, runValidators:true, context:'query'},
    (err, empDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }
        res.json({
            ok:true,
            msg: 'Empleado actualizado con exito',
            empleado: empDB
        });
    });
 });

 app.delete('/empleado/:id', function ( req, res){

    let id = req.params.id;
    Empleado.findByIdAndUpdate(id, { activo: false }, 
        { new: true, runValidators: true, context: 'query'},(err, empBD) => {
            if(err) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ocurrio un error al momento de eliminar',
                            err
                        });
                    }
                    res.json({
                        ok:true,
                        msg: 'Empleado eliminado con exito',
                        empBD
                    });
    });
  });
  
  module.exports = app;