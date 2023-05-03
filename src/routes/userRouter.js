import { Router } from 'express';
import { soloLogueados } from '../middlewares/soloLogueados.js';

export const userRouter = Router()

userRouter.get('/info', soloLogueados, (req, res, next) => {
    // passport guarda la sesion directamente en ** req.user ** en lugar del campo session de la peticion !
    res.json(req.user)
})