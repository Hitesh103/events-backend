import express from 'express';
import { createUser} from '../controller/user.js';

const authRouter = express.Router(); 

authRouter.post('/google', createUser); 

export default authRouter;