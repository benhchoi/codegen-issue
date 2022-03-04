# Summary

A reproduction of issues with graphql-code-generator. Check annotations made in the files under the "generated" folder to see the errors I'm referencing. There are 2 issues I wanted to point out:

1. A child interface that implements a parent interface does not actually do so with code generated under the "typescript" plugin even though the feature is now supported under the GraphQL spec and graphql-js as of v15.0.0.
2. The "typescript-mongodb" plugin does not properly reference a DbInterface for a field that specifies an interface as its type instead of an object.

# Issue 1: interfaces implementing other interfaces

## The schema

```
interface Node {
  id: ID!
}

interface ChildInterface implements Node {
  example1: String!
}
```

## Expected generated output

```
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export type Node = {
  id: Scalars["ID"];
}

export type ChildInterface = Node & {
  example1: Scalars["String"];
}
```

## Actual generated output

```
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export type Node = {
  id: Scalars["ID"];
}

export type ChildInterface = {
  example1: Scalars["String"];
}
```

# Issue 2: Incorrect reference to DbObject as opposed to DbInterface

## The schema

```
interface Node @abstractEntity(discriminatorField: "type") {
  id: ID! @id
}

interface ChildInterface implements Node
  @abstractEntity(discriminatorField: "childType") {
  example1: String! @column
}

type ExampleObject implements ChildInterface @entity {
  example2: Node! @link
  example3: ChildInterface! @link
}
```

## Expected generated output

```
import { ObjectId } from "mongodb";

export type NodeDbInterface = {
  _id: ObjectId;
  type: string;
};

export type ChildInterfaceDbInterface = NodeDbInterface & {
  example1: string;
  childType: string;
};

export type ExampleObjectDbObject = ChildInterfaceDbInterface & {
  example2: NodeDbInterface["_id"];
  example3: ChildInterfaceDbInterface["_id"];
};
```

## Actual generated output

```
import { ObjectId } from "mongodb";

export type NodeDbInterface = {
  _id: ObjectId;
  type: string;
};

export type ChildInterfaceDbInterface = {
  example1: string;
  childType: string;
};

export type ExampleObjectDbObject = ChildInterfaceDbInterface & {
  example2: NodeDbObject["_id"]; // throws an error, cannot find "NodeDbObject"
  example3: ChildInterfaceDbObject["_id"] // throws an error, cannot find "ChildInterfaceDbObject"
};
```
