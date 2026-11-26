import ejemplo from './ejemplo.routes.js';
import productos from './productos.routes.js';
import { Router } from 'express';
const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/productos', productos);


export default indexRoutes;