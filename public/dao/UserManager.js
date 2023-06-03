import fs from 'fs/promises'
import mongoose from 'mongoose';

import { usuarioModel } from './models/schemaUsuarios.js';
import { hashear } from '../../src/utils/criptografia.js';
import { Persistencia } from './fileSystemProducts.js';




export class UserManager {
    
        constructor(path) {
            this.users;
            this.path = path;
            this.persistencia =new Persistencia(path)
        }
    
    
        async readUsers() {
            const data = await fs.readFile(this.path, "utf-8");
            this.users = JSON.parse(data);
        }
    
        async getUsers() {
           try {
            await this.saveUsersLocal()
            return this.users
           } catch (error) {
            throw new Error('SERVER-COMUNICATION-ERROR')
           }
        }

        async getUserById(id) {
            try {
                const usuarioFiltrado = await usuarioModel.find({_id:id}).lean()
                if (!usuarioFiltrado) {return "user not found"} else {return usuarioFiltrado}
               } catch (error) {
                throw new Error('USER-NOT-FOUND')
               }
        }
        async getUserByUserName(userName) {
          try {
            const usuarioFiltrado = await usuarioModel.findOne({email: userName}).lean();
            if (usuarioFiltrado) {
              return usuarioFiltrado;
            }
            else {
              throw new Error("USER-NOT-FOUND");
            }
          } catch (error) {
              throw error;
          }
        }
        async saveUsersLocal(){
            try {
            const usuarios = await usuarioModel.find().lean()
            this.users = usuarios;
            const jsonUsers = JSON.stringify(this.users, null, 2)
            // await fs.writeFile(this.path, jsonUsers)
            await this.persistencia.saveTxt(jsonUsers)
            
            } catch (error) {
                throw new Error('SERVER-COMUNICATION-ERROR')
            }
        }
        async createUser(user){
            try {
                // const usuarioNuevo = {email: user.email, password: hashear(user.password), first_name:user.first_name, last_name:user.last_name, age:user.age,rol:user.rol}
                const usuarioNuevo = {email: user.email, password: user.password, first_name:user.first_name, last_name:user.last_name, age:user.age,rol:user.rol,cart: user.cart}
                await usuarioModel.create(usuarioNuevo)
                await this.saveUsersLocal()
               } catch (error) {
                throw new Error('CAMPOS-INCOMPLETOS')
               }
        }

        async updateUser(id,nuevoModificado){
            try {
                const filtro = {_id:id}
                const update = nuevoModificado
                await usuarioModel.findOneAndUpdate(filtro,update)
                await this.saveUsersLocal()
               } catch (error) {
                throw new Error('USER-NOT-FOUND')
               }
        }

        async deleteUser(id){
            try {
                await usuarioModel.findOneAndDelete({_id:id})
                await this.saveUsersLocal()
               } catch (error) {
                throw new Error('USER-NOT-FOUND')
               }
        }

}


export const userManager = new UserManager('./usuarios.txt')



/*
function matcher(query) {
  return function (obj) {
    const conditions = Object.entries(query)
    for (const [key, value] of conditions) {
      if (!obj[key] || obj[key] != value) return false
    }
    return true
  }
}

function toPojo(object) {
  return JSON.parse(
    JSON.stringify(
      object
    )
  )
}

class PetsDao {
  #pets
  constructor() {
    this.#pets = []
  }

  create(element) {
    const pojo = toPojo(element)
    this.#pets.push(pojo)
    return Promise.resolve(pojo)
  }

  readOne(criteria) {
    const result = this.#pets.find(matcher(criteria))
    if (!result) throw new Error('NOT FOUND')
    return Promise.resolve(result)
  }

  readMany(criteria) {
    return Promise.resolve(this.#pets.filter(matcher(criteria)))
  }

  updateOne(criteria, newData) {
    const index = this.#pets.findIndex(matcher(criteria))
    if (index === -1) throw new Error('NOT FOUND')
    this.#pets[index] = toPojo({
      ...this.#pets[index],
      ...newData
    })
    return Promise.resolve(this.#pets[index])
  }

  updateMany(criteria, newData) {
    let modifiedCount = 0
    for (let index = 0; index < this.#pets.length; index++) {
      if (matcher(criteria)(this.#pets[index])) {
        this.#pets[index] = toPojo({
          ...this.#pets[index],
          ...newData
        })
        modifiedCount++
      }
    }
    return Promise.resolve({ modifiedCount })
  }

  deleteOne(criteria) {
    const index = this.#pets.findIndex(matcher(criteria))
    if (index === -1) throw new Error('NOT FOUND')
    const deleted = this.#pets[index]
    this.#pets.splice(index, 1)
    return Promise.resolve(deleted)
  }

  deleteMany(criteria) {
    let initialCount = this.#pets.length
    this.#pets = this.#pets.filter(e => !matcher(criteria)(e))
    return Promise.resolve({ deletedCount: initialCount - this.#pets.length })
  }
}

export const petsDao = new PetsDao()

*/