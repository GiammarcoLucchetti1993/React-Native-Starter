import { NestedKeyOf } from "./common";
import { INews } from "./news";
import { User } from "./user";

export type DirectusCollections = {
  users: User[];
  news: INews[];
};

export type DirectusFilters<T> = Partial<
  Record<NestedKeyOf<T>, any> &
    Record<"_and" | "_or", Array<Partial<Record<NestedKeyOf<T>, any>>>>
>;
