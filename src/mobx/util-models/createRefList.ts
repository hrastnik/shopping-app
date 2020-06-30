import {
  types,
  ReferenceOptionsGetSet,
  Instance,
  IAnyType,
} from "mobx-state-tree";

// This could be infered using ReturnType<typeof createRefList> but for
// TS doesn't allow resolving return type of generic functions (smthn like ReturnType<typeof createRefList<T extends IAnyType>>)
export interface RefListInstance<T extends IAnyType> {
  map: any;
  replace: any;
  push: any;
  array: Instance<T>[];
}

export function createRefList<T extends IAnyType>(
  name: string,
  type: T,
  refOptions?: ReferenceOptionsGetSet<T>
) {
  return types.optional(
    types
      .model(name + "RefList", {
        refList: types.array(
          types.safeReference(type, {
            acceptsUndefined: false,
            ...refOptions,
          })
        ),
      })
      .views((self) => {
        return {
          get array(): Instance<T>[] {
            return (self.refList.toJS() as unknown) as Instance<T>[];
          },
        };
      })
      .actions((self) => {
        return {
          map(callbackFn, thisArg?) {
            return self.refList.map(callbackFn, thisArg);
          },
          replace(newItems) {
            return self.refList.replace(newItems);
          },
          push(...items) {
            return self.refList.push(...items);
          },
          unshift(...items) {
            return self.refList.unshift(...items);
          },
        };
      }),
    {}
  );
}
