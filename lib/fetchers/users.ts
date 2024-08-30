import {
  readUsers,
  readUser,
  updateUser,
  passwordRequest,
  readMe,
  refresh,
  logout,
  registerUser,
} from "@directus/sdk";
import { User } from "../types/user";
import client from "@/utils/client";

type UserData = Partial<User> & { password?: string };

type RegisterData = {
  email: string;
  password: string;
  options?:
    | {
        verification_url?: string | undefined;
        first_name?: string | undefined;
        last_name?: string | undefined;
      }
    | undefined;
};

export const getUsers = () => client.request(readUsers()) as Promise<User[]>;

export const getUser = (id: string) =>
  client.request(
    readUser(id, {
      fields: ["*"],
    })
  ) as Promise<User>;

export const patchUser = (id: string, data: UserData) =>
  client.request(updateUser(id, data));

export const loginUser = (email: string, password: string) =>
  client.login(email, password, { mode: "json" });

export const logoutUser = (refreshToken: string) =>
  client.request(logout(refreshToken));

export const resetPassword = (email: string) =>
  client.request(passwordRequest(email));

export const register = async (data: RegisterData) =>
  await client.request(registerUser(data.email, data.password, data.options));

export const getCurrentUser = () =>
  client.request(
    readMe({
      fields: ["*"],
    })
  ) as Promise<User>;

export const refreshToken = async (refreshToken: string) =>
  await client.request(refresh("json", refreshToken));
