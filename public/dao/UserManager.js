
import fs from 'fs/promises'
import mongoose from 'mongoose';

import { usuarioModel } from './models/schemaUsuarios.js';


export class UserManager {
    
        constructor(path) {
            this.users;
            this.path = path;
            
        }
    
    
        async readUsers() {
            
            const data = await fs.readFile(this.path, "utf-8");
            this.users = JSON.parse(data);
        }
    
        async getUsers() {
          
         
            const usuaruis = await usuarioModel.find().lean()
            this.users = usuaruis;
            const jsonUsers = JSON.stringify(this.users, null, 2)
            await fs.writeFile(this.path, jsonUsers)
            // await mongoose.connection.close()
            return this.users
    
        }
}