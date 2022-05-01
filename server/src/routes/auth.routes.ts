import { profile, signin, signup } from '../api/controllers/auth.controller';
import { Router } from 'express';

const authRuter: Router = Router();

authRuter.post('/signup', signup);
authRuter.post('/signin', signin);
authRuter.get('/profile', profile);

export default authRuter;
