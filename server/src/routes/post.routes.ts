import { Router } from 'express';
import { isAdmin } from '../middlewares/auth-roles';
import {
  getPosts,
  createPost,
  deletePostById,
  getPostById,
  updatePostById,
} from '../api/controllers/post.controller';
import { UserAuthenticated } from '../middlewares/passport-jwt';

const postRouter: Router = Router();

postRouter.post('/', [UserAuthenticated], createPost); //with jwt
postRouter.get('/', [UserAuthenticated, isAdmin], getPosts); //with passport-jwt
postRouter.get('/:taskId', getPostById);
postRouter.put('/:taskId', UserAuthenticated, updatePostById);
postRouter.delete('/:taskId', [UserAuthenticated], deletePostById);

export default postRouter;
