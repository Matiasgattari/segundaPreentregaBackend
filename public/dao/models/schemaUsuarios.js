import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  rol: {enum: ['Admin', 'User', 'Developer'], type: String},
  cart: { type: String}
}, { versionKey: false })

export const usuarioModel = mongoose.model('usuarios', usuarioSchema)