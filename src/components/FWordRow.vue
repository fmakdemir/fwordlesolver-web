<template>
  <div class="flex">
    <FWordLetter
      v-for="(letter, i) in filledWord"
      :key="i"
      :letter="letter"
      :state="state ? state[i] : 0"
      :disabled="disabled"
      @update:state="onChange(i, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FWordLetter from "../components/FWordLetter.vue";
import { getEmptyArray } from "@/common/arrays";

const { word, size, disabled } = defineProps({
  word: { type: String, required: true },
  size: { type: Number, required: true },
  disabled: { type: Boolean },
});

const [state] = defineModel<number[]>("state");

const filledWord = computed(() => (word + "_".repeat(size)).substring(0, size));

const onChange = (index: number, letterState?: number) => {
  if (disabled || letterState === undefined) {
    return;
  }
  const newState = state.value ? [...state.value] : getEmptyArray(size);
  newState[index] = letterState;
  state.value = newState;
};
</script>

<style scoped></style>
