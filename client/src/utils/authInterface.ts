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
export interface AuthErrors {
  success: boolean;
  errorMessages: string[];
}
