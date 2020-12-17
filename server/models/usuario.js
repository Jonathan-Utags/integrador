const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es necesario']
    },
    primer_apellido:{
        type: String,
        require:[ true, 'El apellido es necesario']
    },
    segundo_apellido:{
        type: String,
        require:[ true, 'El apellido es necesario']
    },
    edad: {
        type: Number,
        require:[true, 'La edad es necesaria']
    },
    curp:{
        type: String,
        unique: true
    },
    telefono:{
        type: Number,
        unique:true,
        require: [true, ' El telefono es necesario']
    },
    mail:{
        type: String,
        unique:true,
        require: [true, ' El Correo es necesario']      
    },
    activo:{
        type:Boolean,
        default:true
    }

});

module.exports = mongoose.model('Usuario', usuarioSchema);