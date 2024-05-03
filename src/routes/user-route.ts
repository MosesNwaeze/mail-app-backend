import {Router} from 'express';
import auth from '../middleware/auth';
import {users} from '../controllers/user-controller';

const routes = Router();

routes.get('/',auth,users);

export default routes;