import _ from "lodash";
import { useEffect, useCallback, useMemo, useReducer } from "react";
import { runInAction } from "mobx";
import {
  getChildType,
  types,
  unprotect,
  IAnyType,
  IMSTMap
} from "mobx-state-tree";

import { useStore } from "./useStore";
import { StoreInstance } from "./createStore";

export interface PaginatedResponse<Data> {
  data: [Data];
  links: {
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface DataResponse<Data> {
  data: Data;
}

const initialState = {
  nextPage: 1,
  isLoading: true,
  isRefreshing: false,
  isFirstLoad: true,
  isFetchingNext: false,
  isEndReached: false
};
type Action =
  | { type: "fetch first" }
  | { type: "refresh" }
  | { type: "fetch next" }
  | { type: "fetch success"; response: PaginatedResponse<any> }
  | { type: "fetch error"; error: Error };
const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "fetch first": {
      if (state.isFirstLoad) return state;
      return { ...state, isFirstLoad: true, isLoading: true };
    }
    case "fetch next": {
      if (state.isRefreshing && !state.isFirstLoad && !state.isFetchingNext)
        return state;
      return {
        ...state,
        isLoading: true,
        isRefreshing: false,
        isFirstLoad: false,
        isFetchingNext: true
      };
    }
    case "refresh": {
      if (state.isRefreshing && !state.isFirstLoad && !state.isFetchingNext)
        return state;
      return {
        ...state,
        isLoading: true,
        isRefreshing: true,
        isFirstLoad: false,
        isFetchingNext: false
      };
    }
    case "fetch success": {
      const { response } = action;
      return {
        ...state,
        nextPage: (response?.meta?.current_page ?? 0) + 1,
        isEndReached: response?.links?.next == null,
        isLoading: false,
        isRefreshing: false,
        isFirstLoad: false,
        isFetchingNext: false,
        data: _.castArray(response.data)
      };
    }
    case "fetch error": {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        isFirstLoad: false,
        isFetchingNext: false,
        error
      };
    }
  }
};

export function useQuery<EntityType extends IAnyType>(
  getFetchFn: (
    store: StoreInstance
  ) => (
    ...args: any[]
  ) => Promise<PaginatedResponse<any>> | Promise<DataResponse<any>>,
  // getProcessorFn: (store: StoreInstance) => (entity: EntityType) => any,
  getResourceMap: (store: StoreInstance) => IMSTMap<EntityType>,
  deps = []
) {
  const store = useStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  // eslint-disable-next-line
  const fetchListFn = useMemo(() => getFetchFn(store), [store, ...deps]);
  const resourceMap = getResourceMap(store);
  // const processorFn = getProcessorFn(store);
  const EntityModel = getChildType(resourceMap);
  const dataList = useMemo(() => {
    const dataList = types
      .array(
        types.safeReference<EntityType>(EntityModel as EntityType, {
          acceptsUndefined: false,
          get: id => resourceMap.get(id as string),
          set: e => e.id
        })
      )
      .create();
    unprotect(dataList);
    return dataList;
  }, [EntityModel, resourceMap]);
  const fetchFirst = useCallback(() => {
    const maybePromise = fetchListFn({ page: 1 });
    const isValid = maybePromise && maybePromise.then;
    if (!isValid) return;
    dispatch({ type: "fetch first" });
    (maybePromise as Promise<any>)
      .then(response => {
        runInAction(() => {
          dataList.replace(_.castArray(response.data).map(e => e.id));
          dispatch({ type: "fetch success", response });
        });
      })
      .catch(error => {
        dispatch({ type: "fetch error", error });
      });
  }, [dataList, fetchListFn]);

  const fetchNext = useCallback(() => {
    if (state.isEndReached || state.isFetchingNext) {
      return;
    }

    const maybePromise = fetchListFn({ page: state.nextPage });
    const isValid = maybePromise && maybePromise.then;
    if (!isValid) return;

    dispatch({ type: "fetch next" });
    (maybePromise as Promise<any>)
      .then(response => {
        runInAction(() => {
          for (const e of _.castArray(response.data)) {
            dataList.push(e.id);
          }
          dispatch({ type: "fetch success", response });
        });
      })
      .catch(error => {
        console.log("error in use query", error.message);
        console.warn("error in use query", error);
        dispatch({ type: "fetch error", error });
      });
  }, [
    dataList,
    fetchListFn,
    state.isEndReached,
    state.isFetchingNext,
    state.nextPage
  ]);

  const refresh = useCallback(() => {
    const maybePromise = fetchListFn({ page: 1 });
    const isValid = maybePromise && maybePromise.then;
    if (!isValid) return;

    dispatch({ type: "refresh" });
    (maybePromise as Promise<any>)
      .then(response => {
        runInAction(() => {
          dataList.replace(_.castArray(response.data).map(e => e.id));
          dispatch({ type: "fetch success", response });
        });
      })
      .catch(error => {
        dispatch({ type: "fetch error", error });
      });
  }, [dataList, fetchListFn]);
  useEffect(() => {
    fetchFirst();
  }, [fetchFirst]);
  const flatListProps = {
    data: dataList,
    extraData: dataList.map(e => e.id).join(":"),
    refreshing: state.isRefreshing,
    onRefresh: refresh,
    onEndReached: fetchNext
  };
  // // eslint-disable-next-line
  // useMemo(() => void console.log(Math.random().toFixed(3), "flatListProps.data changed"), [flatListProps.data]);
  // // eslint-disable-next-line
  // useMemo(() => void console.log(Math.random().toFixed(3), "flatListProps.extraData changed"), [flatListProps.extraData]);
  // // eslint-disable-next-line
  // useMemo(() => void console.log(Math.random().toFixed(3), "flatListProps.refreshing changed"), [flatListProps.refreshing]);
  // // eslint-disable-next-line
  // useMemo(() => void console.log(Math.random().toFixed(3), "flatListProps.onRefresh changed"), [flatListProps.onRefresh]);
  // // eslint-disable-next-line
  // useMemo(() => void console.log(Math.random().toFixed(3), "flatListProps.onEndReached changed"), [flatListProps.onEndReached]);
  return {
    ...state,
    data: dataList,
    fetchFirst,
    fetch,
    flatListProps
  };
}
