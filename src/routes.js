import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TransactionController from './app/controllers/TransactionController';
import CategoriesController from './app/controllers/CategoriesController';
import WalletsController from './app/controllers/WalletsController';

import authMiddleware from './app/middleware/auth';

// import ProviderController from './app/controllers/ProviderController';
// import TelegramController from './app/controllers/TelegramController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users', UserController.index);

routes.post('/transactions', TransactionController.store);
routes.get('/transactions', TransactionController.index);
routes.get('/transactions/:id', TransactionController.show);
routes.put('/transactions', TransactionController.update);

routes.post('/categories', CategoriesController.store);
routes.get('/categories', CategoriesController.index);
routes.get('/categories/:id', CategoriesController.show);
routes.put('/categories', CategoriesController.update);

routes.post('/wallets', WalletsController.store);
//routes.get('/wallets', WalletsController.index);
//routes.get('/wallets/:id', WalletsController.show);
//routes.put('/wallets', WalletsController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
