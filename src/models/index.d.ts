import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type DefaultTodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PlaceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class DefaultTodo {
  readonly id: string;
  readonly defaultTodo: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<DefaultTodo, DefaultTodoMetaData>);
  static copyOf(source: DefaultTodo, mutator: (draft: MutableModel<DefaultTodo, DefaultTodoMetaData>) => MutableModel<DefaultTodo, DefaultTodoMetaData> | void): DefaultTodo;
}

export declare class Place {
  readonly id: string;
  readonly name: string;
  readonly Todos?: string[] | null;
  readonly activities?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Place, PlaceMetaData>);
  static copyOf(source: Place, mutator: (draft: MutableModel<Place, PlaceMetaData>) => MutableModel<Place, PlaceMetaData> | void): Place;
}