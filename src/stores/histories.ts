import { defineStore } from 'pinia';
import { IPixel } from 'src/interfaces';
import useIDBService from 'src/services/idbService';
import {
  HISTORIES_DB_NAME,
  HISTORIES_DB_TABLE,
  HISTORIES_DB_VERSION,
} from 'src/config/index';

interface IState {
  histories: IPixel[][];
}

const { set, count } = useIDBService(
  HISTORIES_DB_NAME,
  HISTORIES_DB_TABLE,
  HISTORIES_DB_VERSION
);

export const useHistoriesStore = defineStore('histories', {
  state: (): IState => {
    return {
      histories: [],
    };
  },
  getters: {
    getHistories: (state) => state.histories,
  },
  actions: {
    async setHistories(histories: IPixel[][]) {
      this.histories = histories;
    },
    async setHistory(id: string, history: IPixel[]) {
      this.histories.push(history);
      set(id, JSON.stringify(history));
    },
    async getPreviousHistory() {
      const lastItem = await count();
      return this.histories[lastItem - 1];
    },
  },
});
