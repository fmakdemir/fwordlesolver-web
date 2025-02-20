<template>
  <Button
    class="m-1 h-10 w-10 border-1 border-gray-500 text-black uppercase"
    :severity="severity"
    :label="letter"
    :disabled="_disabled"
    @click="onClick()"
  />
</template>

<script setup lang="ts">
import { STATES } from "@/common/constants";
import Button from "primevue/button";
import { computed, watch } from "vue";

const { letter, disabled } = defineProps({
  letter: String,
  disabled: Boolean,
});
const state = defineModel<number>("state", { default: 0 });
const severity = computed(() => STATES[state.value].severity);
const _disabled = computed(() => letter === "_" || disabled);

watch(
  () => letter,
  () => {
    state.value = 0;
  },
);

const onClick = () => {
  if (disabled) {
    return;
  }
  state.value = letter === "_" ? 0 : (state.value + 1) % 3;
};
</script>

<style scoped></style>
