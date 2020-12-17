const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    id_usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        require:true,
    },
    id_departamento:{
        type:Schema.Types.ObjectId,
        ref: 'Departamento',
        require:true,
    },
    nombre_del_puesto:{
        type: String,
        require: [true, 'El nombre es necesario'],
        unique:true
    },
    anios_servicio:{
        type: Number,
        requiere: [true, 'Este campo es necesario'],
    },
    hora_entrada:{
        type: Number,
        requiere: [true, 'La hora es necesaria'],
    },
    hora_salida:{
        type: Number,
        requiere: [true, 'La hora es necesaria'],
    },
    activo:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Empleado', empleadoSchema);