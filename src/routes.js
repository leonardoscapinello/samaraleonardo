import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TransactionController from './app/controllers/TransactionController';
import CategoriesController from './app/controllers/CategoriesController';
import CreditCategoriesController from './app/controllers/CreditCategoriesController';
import DebitCategoriesController from './app/controllers/DebitCategoriesController';
import WalletsController from './app/controllers/WalletsController';
import CreditCardWalletsController from './app/controllers/CreditCardWalletsController';

import authMiddleware from './app/middleware/auth';
import CreditsController from './app/controllers/CreditsController';
import DebitsController from './app/controllers/DebitsController';
import DashboardController from './app/controllers/DashboardController';

import CreditCardController from './app/controllers/CreditCardController';
import MailerController from './app/controllers/MailerController';
import CreditWalletsController from './app/controllers/CreditWalletsController';

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
routes.put('/transactions', TransactionController.update);

routes.get('/transactions', TransactionController.index);
routes.get('/transactions/credits', CreditsController.index);
routes.get('/transactions/debits', DebitsController.index);
routes.get('/transactions/creditcard', CreditCardController.index);
routes.get('/transactions/:id', TransactionController.show);

routes.post('/categories', CategoriesController.store);
routes.get('/categories', CategoriesController.index);
routes.get('/categories/credit', CreditCategoriesController.index);
routes.get('/categories/debit', DebitCategoriesController.index);
routes.get('/categories/:id', CategoriesController.show);
routes.put('/categories', CategoriesController.update);

routes.post('/wallets', WalletsController.store);
routes.get('/wallets', WalletsController.index);
routes.get('/wallets/creditcard', CreditCardWalletsController.index);
routes.get('/wallets/credit', CreditWalletsController.index);
routes.get('/wallets/:id', WalletsController.show);
routes.put('/wallets', WalletsController.update);

routes.get('/dashboard', DashboardController.index);

routes.post('/files', upload.single('file'), FileController.store);
routes.post('/mailer', MailerController.store);

export default routes;
