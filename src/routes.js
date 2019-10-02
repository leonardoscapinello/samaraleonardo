import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middleware/auth';
import ProviderController from './app/controllers/ProviderController';
import TelegramController from './app/controllers/TelegramController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

// routes.post('/telegram', TelegramController.store);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
