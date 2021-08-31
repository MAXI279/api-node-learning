const { Schema, model } = require('mongoose')

const MedicoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    img:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
})

MedicoSchema.method('toJSON', function() {
    // eslint-disable-next-line no-unused-vars
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema)