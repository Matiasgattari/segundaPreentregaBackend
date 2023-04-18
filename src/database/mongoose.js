import mongoose, { Schema } from 'mongoose';
import { MONGODB_PATH } from '../config/config.mongo.js';

export const inicioMongoose = await mongoose.connect(MONGODB_PATH)
console.log(`conectado a base de datos en ${MONGODB_PATH}`);



// await mongoose.connection.close()

