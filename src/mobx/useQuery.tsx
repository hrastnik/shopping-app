import React, { useEffect, useCallback, useMemo, useReducer } from "react";
import _ from "lodash";
import { runInAction } from "mobx";
import {
  getChildType,
  types,
  unprotect,
  IAnyType,
  IMSTMap,
} from "mobx-state-tree";

import { useStore } from "./useStore";
import { StoreInstance } from "./createStore";
import { View } from "~/components/View";
import { Spinner } from "~/components/Spinner";

const resultsPerPage = 32;

const initialState = {
  params: { page: 0, limit: resultsPerPage },
  isLoading: true,
  isRefreshing: false,
  isLoadingFirst: true,
  isLoadingNext: false,
  isEndReached: false,
};
type Action =
  | { type: "fetch first" }
  | { type: "refresh" }
  | { type: "fetch next" }
  | { type: "fetch success"; response: any }
  | { type: "fetch error"; error: Error };
const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "fetch first": {
      if (state.isLoadingFirst) return state;
      return { ...state, isLoadingFirst: true, isLoading: true };
    }
    case "fetch next": {
      if (state.isRefreshing && !state.isLoadingFirst && !state.isLoadingNext)
        return state;
      return {
        ...state,
        isLoading: true,
        isRefreshing: false,
        isLoadingFirst: false,
        isLoadingNext: true,
      };
    }
    case "refresh": {
      if (state.isRefreshing && !state.isLoadingFirst && !state.isLoadingNext)
        return state;
      return {
        ...state,
        isLoading: true,
        isRefreshing: true,
        isLoadingFirst: false,
        isLoadingNext: false,
      };
    }
    case "fetch success": {
      const { response } = action;
      return {
        ...state,
        params: {
          page: state.params.page + resultsPerPage,
          limit: resultsPerPage,
        },
        isEndReached:
          response?.data?.data.length === 0 ||
          response?.data?.data?.length < resultsPerPage,
        isLoading: false,
        isRefreshing: false,
        isLoadingFirst: false,
        isLoadingNext: false,
        data: _.castArray(response.data),
      };
    }
    case "fetch error": {
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        isLoadingFirst: false,
        isLoadingNext: false,
        error,
      };
    }
  }
};

export function useQuery<EntityType extends IAnyType>(
  getFetchFn: (store: StoreInstance) => (...args: any[]) => Promise<any>,
  // getProcessorFn: (store: StoreInstance) => (entity: EntityType) => any,
  getResourceMap: (store: StoreInstance) => IMSTMap<EntityType>,
  deps = []
) {
  const store = useStore();
  const [state, dispatch] = useReducer(reducer, initialState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchListFn = useMemo(() => getFetchFn(store), [store, ...deps]);
  const resourceMap = getResourceMap(store);
  // const processorFn = getProcessorFn(store);
  const EntityModel = getChildType(resourceMap);
  const dataList = useMemo(() => {
    const dataList = types
      .array(
        types.safeReference<EntityType>(EntityModel as EntityType, {
          acceptsUndefined: false,
          get: (id) => resourceMap.get(id as string),
          set: (e) => e.id,
        })
      )
      .create();
    unprotect(dataList);
    return dataList;
  }, [EntityModel, resourceMap]);
  const fetchFirst = useCallback(() => {
    const maybePromise = fetchListFn(initialState.params);
    const isValid = maybePromise && maybePromise.then;
    if (!isValid) return;
    dispatch({ type: "fetch first" });
    (maybePromise as Promise<any>)
      .then((response) => {
        runInAction(() => {
          dataList.replace(_.castArray(response.data.data).map((e) => e.id));
          dispatch({ type: "fetch success", response });
        });
      })
      .catch((error) => {
        console.warn("error in use query (fetch first)", error);
        dispatch({ type: "fetch error", error });
      });
  }, [dataList, fetchListFn]);

  const fetchNext = useCallback(() => {
    if (state.isEndReached || state.isLoadingNext) {
      return;
    }

    const maybePromise = fetchListFn(state.params);
    const isValid = maybePromise && maybePromise.then;
    if (!isValid) return;

    dispatch({ type: "fetch next" });
    (maybePromise as Promise<any>)
      .then((response) => {
        runInAction(() => {
          for (const e of _.castArray(response.data.data)) {
            dataList.push(e.id);
          }
          dispatch({ type: "fetch success", response });
        });
      })
      .catch((error) => {
        console.warn("error in use query (fetch next)", error);
        dispatch({ type: "fetch error", error });
      });
  }, [
    dataList,
    fetchListFn,
    state.isEndReached,
    state.isLoadingNext,
    state.params,
  ]);

  const refresh = useCallback(() => {
    const maybePromise = fetchListFn(initialState.params);
    const isValid = maybePromise && maybePromise.then;
    if (!isValid) return;

    dispatch({ type: "refresh" });
    (maybePromise as Promise<any>)
      .then((response) => {
        runInAction(() => {
          dataList.replace(_.castArray(response.data.data).map((e) => e.id));
          dispatch({ type: "fetch success", response });
        });
      })
      .catch((error) => {
        console.warn("error in use query (refresh)", error);
        dispatch({ type: "fetch error", error });
      });
  }, [dataList, fetchListFn]);

  useEffect(() => {
    fetchFirst();
  }, [fetchFirst]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataListArray = useMemo(() => dataList.toJS(), [dataList.toJS()]);

  const flatListProps = {
    data: dataListArray,
    extraData: dataList.map((e) => e.id).join(":"),
    refreshing: state.isRefreshing,
    onRefresh: refresh,
    onEndReached: fetchNext,
    ListFooterComponent: (
      <View style={{ height: 96 }} centerContent>
        {state.isLoadingNext && <Spinner />}
      </View>
    ),
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
    fetchNext,
    refresh,
    flatListProps,
  };
}
