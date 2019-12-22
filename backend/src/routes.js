import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegisterController from './app/controllers/RegisterController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use(cors());

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users/:id', UserController.update);
routes.get('/users/', UserController.index);
routes.delete('/users/:id', UserController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/registers', RegisterController.index);
routes.post('/registers', RegisterController.store);
routes.put('/registers/:id', RegisterController.update);
routes.delete('/registers/:id', RegisterController.delete);

routes.put('/users/help-orders/:id/answer', HelpOrderController.answer);
routes.post('/users/:id/help-orders', HelpOrderController.store);
routes.get('/users/:id/help-orders', HelpOrderController.index);
routes.get('/users/help-orders', HelpOrderController.index);

routes.get('/users/:id/checkins', CheckinController.index);
routes.post('/users/:id/checkins', CheckinController.store);

export default routes;
