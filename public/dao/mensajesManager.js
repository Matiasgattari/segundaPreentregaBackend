import { mensajesDB } from './models/schemaMessages.js'

export class MensajesManager {
    #mensajes
    #path

    constructor(path) {
        this.#path = path
        this.#mensajes = []
    }

    async #leer() {
        const mensajes = await mensajesDB.find().lean()
        this.#mensajes = mensajes
    }

    async #escribir(mensaje) {
        await this.#leer
        await mensajesDB.create(mensaje)
    }

    async guardarMensajes(mensajes) {
        await this.#leer()
        this.#mensajes.push(mensajes)
        await this.#escribir(mensajes)
        return mensajes
    }

    async buscarMensajes() {
        await this.#leer()
        return this.#mensajes
    }

    async borrar() {
        await mensajesDB.deleteMany({})
        return this.#mensajes=[]
    }
}

export const mensajesManager = new MensajesManager('./mensajes.txt')

 
