import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProdutoController from './app/controllers/ProdutoController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import CompraController from './app/controllers/CompraController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/produtos', ProdutoController.store);

routes.get('/produtos', ProdutoController.index);

routes.put('/users', UserController.update);

routes.delete('/produtos/:id', ProdutoController.delete);

routes.put('/produtos/:id', ProdutoController.update);

routes.post('/compras', CompraController.store);

routes.get('/compras', CompraController.index);

routes.delete('/compras/:id', CompraController.delete);

routes.put('/compras/:id', CompraController.update);

export default routes;
