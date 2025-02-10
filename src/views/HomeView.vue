<script setup lang="ts">
import { useEditLogic } from "@/components/EditLogic";
import FKeyboard from "@/components/FKeyboard.vue";
import FSelectSize from "@/components/FSelectSize.vue";
import FWordRow from "@/components/FWordRow.vue";
import { ref, watch } from "vue";

const size = ref(5);

const { words, states, currWord, currState, handleKey } = useEditLogic(size);

watch(
  () => words.value.length,
  () => {
    console.log("New value added", words, states);
  },
);
</script>

<template>
  <main>
    <FSelectSize v-model="size" />
    <FWordRow
      v-for="(word, i) in words"
      :word="word"
      :size="size"
      :state="states[i]"
      :key="i"
      disabled
      @update:state="states[i] = $event"
    />
    <FWordRow :word="currWord" key="curr" :size="size" v-model:state="currState" />
    <FKeyboard @key-press="handleKey" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
