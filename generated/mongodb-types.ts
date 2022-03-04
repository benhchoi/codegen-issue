export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type ChildInterface = {
  // Should include a "Node &"
  example1: Scalars["String"];
};

export type ExampleObject = ChildInterface & {
  __typename?: "ExampleObject";
  example2: Node;
  example3: ChildInterface;
};

export type Node = {
  id: Scalars["ID"];
};

import { ObjectId } from "mongodb";
export type ChildInterfaceDbInterface = {
  // Should include a "NodeDbInterface &"
  example1: string;
  childType: string;
};

export type ExampleObjectDbObject = ChildInterfaceDbInterface & {
  example2: NodeDbObject["_id"]; // Should be NodeDbInterface['_id']
  example3: ChildInterfaceDbObject["_id"]; // Should be ChildInterfaceDbInterface['_id']
};

export type NodeDbInterface = {
  _id: ObjectId;
  type: string;
};
