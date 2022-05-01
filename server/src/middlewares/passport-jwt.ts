import { ExtractJwt, Strategy as JWTStrategy, VerifiedCallback } from 'passport-jwt';
import config from '../config/jwt-config';
import { UserService } from '../api/services/user.service';
import { Request } from 'express';
import { User } from '@prisma/client';
import passport, { PassportStatic } from 'passport';

const userService = new UserService();

export default new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET,
  },
  async (payload, done: VerifiedCallback) => {
    try {
      const user = await userService.findById(payload.id);
      return user ? done(null, user) : done(null, false);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);

export const UserAuthenticated = passport.authenticate('my-auth-jwt', { session: false })

export interface RequestSession extends Request{
  user: User
}
