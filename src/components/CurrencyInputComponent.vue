<script setup lang="ts">
import InputGroupAddon from "primevue/inputgroupaddon";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import InputGroup from "primevue/inputgroup";
import { computed } from "vue";

const props = defineProps<{ options: string[] }>();
const value = defineModel<number>("value");
const currency = defineModel<string | undefined>("currency");

const options = computed(() =>
  props.options.map((o) => ({ label: o.toUpperCase(), value: o }))
);

const inputAttributes = computed(() => {
  if (currency.value) {
    return {
      mode: "currency",
      currency: currency.value,
      locale: "de-DE"
    };
  }
  return {};
});
</script>

<template>
  <InputGroup>
    <InputNumber v-model="value" v-bind="inputAttributes" />
    <InputGroupAddon>
      <Select
        :modelValue="{
          label: currency?.toUpperCase(),
          value: currency,
        }"
        @update:modelValue="currency = $event.value"
        :options="options"
        optionLabel="label"
        class="dropdown"
      />
    </InputGroupAddon>
  </InputGroup>
</template>

<style scoped>
.dropdown {
  width: 100px !important;
}
</style>
