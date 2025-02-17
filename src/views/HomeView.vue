<script setup lang="ts">
import {
  getSolveWordleMutationOptions,
  solveWordle,
  useSolveWordle,
  type WordleSolveResponse,
} from "@/api";
import { getEmptyArray } from "@/common/arrays";
import { STATES } from "@/common/constants";
import { useEditLogic } from "@/components/EditLogic";
import FKeyboard from "@/components/FKeyboard.vue";
import FSelectSize from "@/components/FSelectSize.vue";
import FSuggestions from "@/components/FSuggestions.vue";
import FWordRow from "@/components/FWordRow.vue";
import Button from "primevue/button";
import Select from "primevue/select";
import { computed, ref, watch, watchEffect } from "vue";

const size = ref(5);
const resp = ref<WordleSolveResponse>({
  alternatives: [],
  suggestions: [],
  remaining: 100,
  used_letters: [],
});
const sizeSelect = ref<{ label: string; value: number } | null>();

const { words, states, currWord, currState, resetGame, removeWord, handleKey } = useEditLogic(size);

const gameOver = computed(() => resp.value.remaining <= 1);

const fetchSuggestions = async () => {
  const places = states.value.map((s, si) =>
    getEmptyArray(size.value)
      .map((_, vi) => {
        const v = s[vi] ?? 0;
        console.log(s, si, v, vi);
        return STATES[v].letter;
      })
      .join(""),
  );
  console.log("New value added", words.value, places);
  const results = await solveWordle({
    words: words.value,
    places,
    size: size.value,
  });
  console.log("New state", words.value, places, results);
  resp.value = results.data;
};

watch(() => words.value.length, fetchSuggestions);

watch(() => size.value, resetGame);

watchEffect(() => fetchSuggestions());

const onSuggest = (word: string) => {
  currWord.value = word.substring(0, size.value);
  currState.value = getEmptyArray(size.value);
};
</script>

<template>
  <main class="touch-manipulation">
    <div class="flex flex-wrap">
      <Select
        v-model="size"
        :options="[2, 3, 4, 5, 6, 7, 8, 9, 10]"
        placeholder="Select length"
        checkmark
        label="Word length"
        :highlightOnSelect="false"
        class="w-full md:w-56"
      />

      <FSelectSize v-model="size" />
      <button class="btn" @click="resetGame">Reset Game</button>
    </div>
    <div class="flex flex-wrap items-center justify-center">
      <div class="mx-10 mb-4 flex flex-col pt-16">
        <div v-for="(word, i) in words" :key="i" class="flex">
          <FWordRow
            :word="word"
            :size="size"
            :state="states[i]"
            disabled
            @update:state="states[i] = $event!!"
          />
          <Button variant="outlined" icon="pi pi-trash" @click="removeWord(i)" />
        </div>
        <div class="flex">
          <FWordRow
            v-if="!gameOver"
            :word="currWord"
            key="curr"
            :size="size"
            v-model:state="currState"
          />
          <Button variant="text" icon="pi pi-trash" disabled />
        </div>
        <Button
          label="Submit"
          :outlined="currWord.length !== size"
          severity="info"
          :disabled="currWord.length !== size"
          @click="handleKey('Enter')"
        />
      </div>
      <FSuggestions
        class="mx-10 my-4"
        :suggestions="resp.suggestions"
        :alternatives="resp.alternatives"
        :remaining="resp.remaining"
        @suggest="onSuggest"
      />
    </div>
    <FKeyboard :used-letters="resp.used_letters" @key-press="handleKey" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
