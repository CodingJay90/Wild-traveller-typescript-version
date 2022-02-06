export interface IUser {
  username?: string;
  email: string;
  password: string;
  gender?: string;
  bio?: string;
  avatar?: string;
  token?: string;
  _id?: string;
}

export interface IUserForm {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  gender: string | undefined;
  bio: string | undefined;
  avatar: string | undefined;
}
export interface AuthErrors {
  success: boolean;
  errorMessages: string[];
}
