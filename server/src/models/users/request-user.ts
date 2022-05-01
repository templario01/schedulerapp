export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UserSession {
  email: string;
  password: string;
}

export enum Role {
  user = 'USER',
  admin = 'ADMIN',
}
