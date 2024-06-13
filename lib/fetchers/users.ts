import { readItems } from "@directus/sdk";
import { DirectusFilters } from "../types/directus";
import { IUsers } from "../types/user";
import client from "@/utils/client";

type UsersOptions = {
  filter?: DirectusFilters<IUsers>;
  sort?: "date_created" | "-date_created" | undefined;
  page?: number;
  limit?: number;
};

export const getUsers = () =>
  client.request(readItems("users")) as Promise<IUsers[]>;
