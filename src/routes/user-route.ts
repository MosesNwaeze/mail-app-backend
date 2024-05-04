import {Router} from 'express';
import auth from '../middleware/auth';
import {users,user} from '../controllers/user-controller';

const routes = Router();

routes.get('/',auth,users);
routes.get('/:userId',auth,user);

export default routes;