import { User } from '@prisma/client';
import { UserRequest, UserSession } from 'models/users/request-user';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/jwt-config';
import { AccessTokenResponse } from 'models/users/access-token-response';
import { PrismaService } from './prisma.service';

export class UserService {
  private readonly prismaService: PrismaService;
  constructor() {
    this.prismaService = new PrismaService();
  }

  async signup(params: UserRequest): Promise<AccessTokenResponse> {
    const findEmail = await this.findByEmail(params.email);
    if (findEmail) {
      throw new Error('Email already exist');
    }
    const newUser = await this.createUser(params);
    const token = jwt.sign({ id: newUser.id }, config.SECRET, {
      expiresIn: 86400,
    });
    return { access_token: token };
  }

  async signin(params: UserSession): Promise<AccessTokenResponse> {
    const getUser = await this.findByEmail(params.email);
    if (!getUser) {
      throw new Error('User not found').message;
    }
    const matchPassword = await this.comparePassword(
      params.password,
      getUser.password
    );
    if (!matchPassword) {
      throw new Error('Invalid Password').message;
    }

    const token = jwt.sign({ id: getUser.id }, config.SECRET, {
      expiresIn: 86400,
    });
    return { access_token: token };
  }

  async createUser(param: UserRequest): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        name: param.name,
        email: param.email,
        password: await this.encryptPassword(param.password),
        role: param.role,
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  encryptPassword = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
  };

  comparePassword = async (
    password: string,
    savedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, savedPassword);
  };
}
