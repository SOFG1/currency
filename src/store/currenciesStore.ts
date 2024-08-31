import { defineStore } from "pinia";
import { ref } from "vue";
import { CurrencyType } from "../types";
import { currenciesApi } from "../api/currenciesApi";
import { currencyKeys } from "../constants";

export const useCurrenciesStore = defineStore("currenciesStore", () => {
  const mainCurrency = ref<CurrencyType>("rub");
  const currencyRates = ref<{ [key: string]: number }>({});

  async function fetchCurrencies() {
    const res = await currenciesApi.getCurrencies();
    const data: any = {};
    currencyKeys.forEach((k: string) => (data[k] = res.data[k]));
    currencyRates.value = data;
  }

  return { mainCurrency, fetchCurrencies, currencyRates };
});
