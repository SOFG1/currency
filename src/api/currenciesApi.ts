import axios from "axios";

export const currenciesApi = {
  getCurrencies: async () => {
    return axios.get("https://status.neuralgeneration.com/api/currency");
  },
};