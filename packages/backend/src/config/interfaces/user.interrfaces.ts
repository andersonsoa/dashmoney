export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type IUserData = Omit<IUser, "id">;

export type IUserAuthenticationData = Pick<IUser, "email" | "password">;
