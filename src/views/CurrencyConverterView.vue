<script setup lang="ts">
import Card from "../UI/Card.vue";
import Button from "primevue/button";
import { currencyOptions } from "../constants";
import { computed, onMounted, ref, watch } from "vue";
import { useCurrenciesStore } from "../store/currenciesStore";
import { CurrencyType } from "../types";
import CurrencyInputComponent from "../components/CurrencyInputComponent.vue";

const currenciesStore = useCurrenciesStore();

const currency1 = ref<CurrencyType>(
  currenciesStore.mainCurrency || currencyOptions[0]
);
const currency2 = ref<CurrencyType>(currencyOptions[1]);
const value1 = ref<number | undefined>();
const value2 = ref<number | undefined>();

const firstOptions = computed(() => {
  const opts = currencyOptions.filter((o) => o !== currency2.value);
  return opts;
});
const secondOptions = computed(() => {
  const opts = currencyOptions.filter((o) => o !== currency1.value);
  return opts;
});

function onSwap() {
  const first = currency1.value;
  currency1.value = currency2.value;
  currency2.value = first;
  changeFirst(value1.value || 0);
}

function changeFirst(v: number) {
  value1.value = v;
  const currencyKey = `${currency1.value}-${currency2.value}`;
  const currencyRate = currenciesStore.currencyRates[currencyKey];
  const secondValue = v * currencyRate;
  const rounded = Number(secondValue.toFixed(2));
  value2.value = rounded;
}

function changeSecond(v: number) {
  value2.value = v;
  const currencyKey = `${currency2.value}-${currency1.value}`;
  const currencyRate = currenciesStore.currencyRates[currencyKey];
  const firstValue = v * currencyRate;
  const rounded = Number(firstValue.toFixed(2));
  value1.value = rounded;
}

watch([currency1, currency2], () => {
  changeFirst(value1.value || 0);
});

//Set second currency innitially
watch(
  secondOptions,
  () => {
    currency2.value = secondOptions.value[0];
  },
  { immediate: true, once: true }
);

onMounted(currenciesStore.fetchCurrencies); //fetch fresh data on each mount
</script>

<template>
  <Card title="Currency converter" class="card">
    <div class="content">
      <CurrencyInputComponent
        :options="firstOptions"
        v-model:currency="currency1"
        :value="value1"
        @update:value="changeFirst"
      />
      <Button @click="onSwap">
        <span
          class="pi pi-arrow-right-arrow-left"
          style="font-size: 20px"
        ></span>
      </Button>
      <CurrencyInputComponent
        :options="secondOptions"
        v-model:currency="currency2"
        :value="value2"
        @update:value="changeSecond"
      />
    </div>
  </Card>
</template>

<style scoped>
.card {
  max-width: 1000px;
}
.content {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 30px;
}

.dropdown {
  width: 100px !important;
}

@media screen and (max-width: 600px) {
  .content {
    flex-direction: column;
  }
}
</style>
