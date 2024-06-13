import { NestedKeyOf } from "./common";
import { IUsers } from "./user";

export type DirectusCollections = {
  users: IUsers[];
};

export type DirectusFilters<T> = Partial<
  Record<NestedKeyOf<T>, any> &
    Record<"_and" | "_or", Array<Partial<Record<NestedKeyOf<T>, any>>>>
>;
