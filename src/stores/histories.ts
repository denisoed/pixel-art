import { defineStore } from 'pinia';
import { IPixel } from '@/interfaces';
import useIDBService from '@/services/idbService';
import {
  HISTORIES_DB_NAME,
  HISTORIES_DB_TABLE,
  HISTORIES_DB_VERSION,
} from '@/config/index';

interface IState {
  histories: IPixel[][];
}

const { set, count } = useIDBService(
  HISTORIES_DB_NAME,
  HISTORIES_DB_TABLE,
  HISTORIES_DB_VERSION,
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
    async setHistory(history: IPixel[]) {
      const date = new Date();
      this.histories.push(history);
      set(date.toLocaleString(), history);
    },
    async getPreviousHistory() {
      const lastItem = await count();
      // TODO
    },
  },
});
