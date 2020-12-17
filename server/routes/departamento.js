const express = require('express');
const _ = require ('underscore');
const Usuario = require('../models/departamento');
const app = express();


app.get('/departamento', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 100;
    Departamento.find({ activo: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err,departamentos) => {
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al consultar los dapartamentos',
                err
            });
        }
    
        res.json({
            ok:true,
            msg:'Lista de departamentos obtenida con exito',
            conteo: departamentos.length,
            departamentos
        });
    });
  });

  app.post('/departamento', function(req, res){
    let body = req.body;
    let dap = new Departamento({
        id_jefe_de_area: body.id_jefe_de_area,
        nombre: body.nombre,
        numero_empleados: body.numero_empleados,
        extencion_telefonica: body.extencion_telefonica,
    }); 

    dap.save((err, dapDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Departamento insertado con exito',
            dapDB
        });
    });
  });

  app.put('/departamento/:id', function (req, res){
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','numero_empleados','extencion_telefonica']);

    Departamento.findByIdAndUpdate(id , body , 
    { new:true, runValidators:true, context:'query'},
    (err, dapDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }
        res.json({
            ok:true,
            msg: 'Departamento actualizado con exito',
            departamento: dapDB
        });
    });
 });

 app.delete('/departamento/:id', function ( req, res){

    let id = req.params.id;
    Departamento.findByIdAndUpdate(id, { activo: false }, 
        { new: true, runValidators: true, context: 'query'},(err, dapBD) => {
            if(err) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ocurrio un error al momento de eliminar',
                            err
                        });
                    }
                    res.json({
                        ok:true,
                        msg: 'Departamento eliminado con exito',
                        dapBD
                    });
    });
  });
  
  module.exports = app;
  