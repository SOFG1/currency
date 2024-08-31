<script setup lang="ts">
import Card from "primevue/card";

defineProps<{ title: string }>();
</script>

<template>
  <Card class="card">
    <template #title>
      <h3 class="title">{{ title }}</h3>
    </template>
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<style scoped>
.card {
  margin: 30px;
  max-width: 700px;
}
.title {
  margin: 0;
}
</style>
