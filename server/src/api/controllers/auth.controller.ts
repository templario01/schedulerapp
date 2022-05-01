import { UserService } from '../services/user.service';
import { Request, Response } from 'express';

const userService = new UserService();

export const signup = async (req: Request, res: Response) => {
  try {
    const createAccount = await userService.signup(req.body);
    res.json(createAccount);
  } catch (err) {
    res.json(err).status(400);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const getSession = await userService.signin(req.body);
    res.json(getSession);
  } catch (err) {
    res
      .json({
        error: {
          message: err,
        },
      })
      .status(400);
  }
};

export const profile = (req: Request, res: Response) => {
  res.send('profile');
};
