import _ from "lodash";
import {
  types,
  Instance,
  SnapshotOut,
  SnapshotIn,
  flow,
  getEnv,
  getRoot
} from "mobx-state-tree";
import { AxiosInstance } from "axios";

import { preprocess } from "~/mobx/utils/preprocess";
import { HttpStatic } from "~/services/http/createHttp";
import { PersistenceStatic } from "~/services/persistence/createPersistence";

const User = types.model("User", {
  id: types.identifier
});

export interface UserInstance extends Instance<typeof User> {}
export interface UserSnapshotIn extends SnapshotIn<typeof User> {}
export interface UserSnapshotOut extends SnapshotOut<typeof User> {}

const UserStore = types
  .model("UserStore", {
    map: types.map(User)
  })
  .actions(self => {
    return {
      processUserList(data) {
        for (const entity of _.castArray(data)) {
          self.map.put(entity);
        }
      }
    };
  });

export interface UserStoreInstance extends Instance<typeof UserStore> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStore> {}

const Post = types
  .model("Post", {
    id: types.identifier,
    user: types.safeReference(User),
    title: types.string,
    rand: types.optional(types.string, "BANANA")
  })
  .actions(self => {
    return {
      delete() {
        const http: AxiosInstance = getEnv(self).http;
        http.delete(`/posts/${self.id}`);
      }
    };
  });

export interface PostInstance extends Instance<typeof Post> {}
export interface PostSnapshotIn extends SnapshotIn<typeof Post> {}
export interface PostSnapshotOut extends SnapshotOut<typeof Post> {}

const PostStore = types
  .model("PostStore", {
    map: types.map(Post)
  })
  .views(self => {
    return {
      get http(): AxiosInstance {
        return getEnv(self).http;
      },
      get root(): StoreInstance {
        return getRoot(self);
      }
    };
  })

  .actions(self => {
    return {
      processPostList(data) {
        const processFn = self.root.userStore.processUserList;
        for (const entity of _.castArray(data)) {
          preprocess(entity, "user", processFn);
          self.map.put(entity);
        }
      }
    };
  })
  .actions(self => {
    return {
      readPostList: flow(function*(params: { page: number; search: string }) {
        const response = yield self.http.get("/posts", { params });
        self.processPostList(response.data.data);
        return response;
      }),

      readPost: flow(function*(params: { id: string }) {
        const response = yield self.http.get(`/posts/${params.id}`);
        self.processPostList(response.data.data);
        return response;
      })
    };
  });

export interface PostStoreInstance extends Instance<typeof PostStore> {}
export interface PostStoreSnapshotIn extends SnapshotIn<typeof PostStore> {}
export interface PostStoreSnapshotOut extends SnapshotOut<typeof PostStore> {}

export function createStore(env: {
  http: HttpStatic;
  persistence: PersistenceStatic;
}) {
  const Store = types.model("Store", {
    postStore: PostStore,
    userStore: UserStore
  });

  return Store.create(
    {
      postStore: {},
      userStore: {}
    },
    env
  );
}

export interface StoreInstance extends ReturnType<typeof createStore> {}
