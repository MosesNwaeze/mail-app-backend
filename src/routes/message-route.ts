import {Router} from 'express';
import {create,setRead,fetchUserMessages,single} from '../controllers/message-controller';
import auth from '../middleware/auth';

const routes = Router();

routes.post('/send-message',auth,create);
routes.get('/read-message/:messageId',auth,setRead);
routes.get('/:userId', auth, fetchUserMessages);
routes.get('/single/:messageId', auth, single)

export default routes