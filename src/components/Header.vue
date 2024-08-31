<script setup lang="ts">
import Select from "primevue/select";
import Menubar from "primevue/menubar";
import { useCurrenciesStore } from "../store/currenciesStore";
import { currencyOptions } from "../constants";

const currenciesStore = useCurrenciesStore();

const items = [
  {
    label: "Currency Rates",
    route: "/",
  },
  {
    label: "Currency Converter",
    route: "/converter",
  },
];
const options = currencyOptions.map((c) => ({
  label: c.toUpperCase(),
  value: c,
}));
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props }">
      <RouterLink :to="item.route" v-bind="props.action">
        <a v-ripple>
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a></RouterLink
      >
    </template>
    <template #end>
      <Select
        placeholder="Selected currency"
        :options="options"
        :modelValue="{
          label: currenciesStore.mainCurrency.toUpperCase(),
          value: currenciesStore.mainCurrency,
        }"
        @update:modelValue="currenciesStore.mainCurrency = $event.value"
        optionLabel="label"
      />
    </template>
  </Menubar>
</template>


<style scoped>
.router-link-active {
  background-color: rgb(239, 228, 255);
  border-radius: 6px;
}
</style>