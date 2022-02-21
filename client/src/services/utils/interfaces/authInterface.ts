export interface IUser {
  username?: string;
  email: string;
  password: string;
  gender?: string;
  bio?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  token?: string;
  _id?: string;
  city?: string;
  country?: string;
  locations?: number;
  comments?: number;
}

export interface IUserForm {
  username: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  bio: string | undefined;
  avatar: string | undefined;
  title?: string | undefined;
  country?: string | undefined;
  city?: string | undefined;
}
export interface AuthErrors {
  success: boolean;
  errorMessages: string[];
}
