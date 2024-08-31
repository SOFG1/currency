<script setup lang="ts">
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import { computed, onMounted } from "vue";
import { useCurrenciesStore } from "../store/currenciesStore";
import { currencyOptions } from "../constants";
import Card from "../UI/Card.vue";

const currenciesStore = useCurrenciesStore();

const showData = computed(() => {
  const data: { [key: string]: string | number } = { [currenciesStore.mainCurrency]: "1" };

  currencyOptions.forEach((c) => {
    if (c === currenciesStore.mainCurrency) return; //Main already added in the first order
    const key = `${currenciesStore.mainCurrency}-${c}`;
    const value = currenciesStore.currencyRates[key];
    const rounded = Number.isInteger(value) ? value : value?.toFixed(2)
    data[c] = rounded;
  });

  return data;
});

onMounted(currenciesStore.fetchCurrencies); //fetch fresh data on each mount
</script>

<template>
  <Card title="Currency rates">
    <DataTable :value="[showData]">
      <Column
        v-for="(_, key) in showData"
        :field="key"
        :header="String(key).toUpperCase()"
      ></Column>
    </DataTable>
  </Card>
</template>

<style scoped></style>
