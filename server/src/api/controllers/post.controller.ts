import { PostService } from '../services/post.service';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

const postService = new PostService();
const userService = new PostService();

export const createPost = async (req: Request, res: Response) => {
  console.log(req.user)
  try {
    const userSession = req.user as User
    const createPost = await postService.createPost(req.body, userSession.id);
    res.json(createPost);
  } catch (err) {
    res.json(err).status(400);
  }
};
export const getPosts = (req: Request, res: Response) => {
  console.log(req.user)
  res.json('get all posts');
};
export const getPostById = (req: Request, res: Response) => {
  res.json('get post by ID');
};
export const updatePostById = (req: Request, res: Response) => {
  res.json('update post');
};
export const deletePostById = (req: Request, res: Response) => {
  res.json('delete post');
};
