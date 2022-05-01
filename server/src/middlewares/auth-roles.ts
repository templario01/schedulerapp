import { UserService } from '../api/services/user.service';
import { NextFunction, Response } from 'express';
import { Role } from '../models/users/request-user';
import { RequestSession } from './passport-jwt';
import { VerifiedCallback } from 'passport-jwt';

const userService = new UserService();

export const isAdmin = async (
  req: RequestSession,
  res: Response,
  done: VerifiedCallback
) => {
  if (req.user?.role !== Role.admin) {
    return res.status(405).json({ message: 'Unauthorized! Just Admins' });
  }
  done(null, req.user);
};
