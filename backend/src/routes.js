import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegisterController from './app/controllers/RegisterController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateRegisterStore from './app/validators/RegisterStore';
import validateRegisterUpdate from './app/validators/RegisterUpdate';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validateHelpOrderStore from './app/validators/HelpOrderStore';
import validateHelpOrderUpdate from './app/validators/HelpOrderUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use(cors());

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users/:id', validateUserUpdate, UserController.update);
routes.get('/users/', UserController.index);
routes.get('/user/:id', UserController.index);
routes.delete('/users/:id', UserController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plan/:id', PlanController.index);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/registers', RegisterController.index);
routes.get('/register/:id', RegisterController.index);
routes.post('/registers', validateRegisterStore, RegisterController.store);
routes.put('/registers/:id', validateRegisterUpdate, RegisterController.update);
routes.delete('/registers/:id', RegisterController.delete);

routes.put(
  '/users/help-orders/:id/answer',
  validateHelpOrderUpdate,
  HelpOrderController.update
);
routes.post(
  '/users/:id/help-orders',
  validateHelpOrderStore,
  HelpOrderController.store
);
routes.get('/users/:id/help-orders', HelpOrderController.index);
routes.get('/users/help-orders', HelpOrderController.index);

routes.get('/users/:id/checkins', CheckinController.index);
routes.post('/users/:id/checkins', CheckinController.store);

export default routes;
