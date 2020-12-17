const mongoose = require('mongoose');
const { unique } = require('underscore');

let Schema = mongoose.Schema;

let departamentoSchema = new Schema({

    id_jefe_de_area:{
        type:Schema.Types.ObjectId,
        ref:'Empleado',
        requiere:true
    },
    nombre:{
        type: String,
        requiere:[true, 'El nombre es necesario']
    },
    numero_empleados:{
        type: Number,
        requiere:true
    },
    extencion_telefonica:{
        type:Number,
        unique: true
    },
    activo:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('Departamento', departamentoSchema);