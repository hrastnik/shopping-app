import { types, flow, getEnv } from "mobx-state-tree";
import _ from "lodash";
import { AxiosResponse } from "axios";

import { Region } from "~/mobx/entities/region/Region";
import { Environment } from "~/mobx/createStore";

export const RegionStore = types
  .model("RegionStore", {
    map: types.map(Region)
  })
  .actions(self => {
    return {
      processRegionList(data) {
        for (const entity of _.castArray(data)) {
          entity.lat = entity.location.lat;
          entity.lng = entity.location.lng;
          self.map.put(entity);
        }
      }
    };
  })
  .actions(self => {
    return {
      createRegion: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(`/regions`, params);
        self.processRegionList(response.data.data);
        return response;
      }),

      readRegionList: flow(function*(params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(`/items/region`, {
          params
        });
        self.processRegionList(response.data.data);
        return response;
      }),

      readRegion: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.get(
          `/items/region/${id}`,
          {
            params
          }
        );
        self.processRegionList(response.data.data);
        return response;
      }),

      updateRegion: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/regions/${id}`,
          params
        );
        self.processRegionList(response.data.data);
        return response;
      }),

      deleteRegion: flow(function*(id, params): any {
        const env: Environment = getEnv(self);
        const response: AxiosResponse = yield env.http.post(
          `/regions/${id}`,
          params
        );
        self.processRegionList(response.data.data);
        return response;
      })
    };
  });
