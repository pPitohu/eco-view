export type UserData = {
  email: string;
  username: string;
  password: string;
}

export type UserLoginData = Pick<UserData, 'email' | 'password'>
