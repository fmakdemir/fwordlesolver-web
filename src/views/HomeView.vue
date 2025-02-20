<script setup lang="ts">
import { useSolveWordle, type WordleSolveRequest, type WordleSolveResponse } from "@/api";
import { getEmptyArray } from "@/common/arrays";
import { STATES } from "@/common/constants";
import { useEditLogic } from "@/components/EditLogic";
import FKeyboard from "@/components/FKeyboard.vue";
import FSuggestions from "@/components/FSuggestions.vue";
import FWordRow from "@/components/FWordRow.vue";
import { computed, ref, watch, watchEffect } from "vue";

const size = ref(5);
const resp = ref<WordleSolveResponse>({
  alternatives: [],
  suggestions: [],
  remaining: 100,
  used_letters: [],
});

const { words, states, currWord, currState, resetGame, removeWord, handleKey } = useEditLogic(size);

const gameOver = computed(() => resp.value.remaining <= 1);

const request = computed<WordleSolveRequest>(() => {
  const places = states.value.map((s) =>
    getEmptyArray(size.value)
      .map((_, vi) => STATES[s[vi] ?? 0].letter)
      .join(""),
  );
  const _request = {
    words: words.value,
    places,
    size: size.value,
  };
  console.log("Request updated", _request);
  return _request;
});

const solveWordleMutation = useSolveWordle();
solveWordleMutation.mutate({ data: request.value });

watch(() => size.value, resetGame);

watch(
  () => solveWordleMutation.data.value?.data,
  () => {
    const data = solveWordleMutation.data.value?.data;
    if (data) {
      resp.value = data;
    }
  },
);

watch(
  () => request.value,
  async () => {
    solveWordleMutation.mutate({ data: request.value });
  },
);

const onSuggest = (word: string) => {
  currWord.value = word.substring(0, size.value);
  currState.value = getEmptyArray(size.value);
};
</script>

<template>
  <main class="touch-manipulation">
    <div class="flex flex-wrap">
      <div class="mx-4">
        <label for="f-select" class="mr-4 text-2xl">Word Size:</label>
        <PSelect
          id="f-select"
          v-model="size"
          size="small"
          :options="[2, 3, 4, 5, 6, 7, 8, 9, 10]"
          placeholder="Select length"
          checkmark
          label="Word length"
          :highlightOnSelect="false"
          class="h-8 w-14"
        />
      </div>

      <PButton
        @click="resetGame"
        variant="outlined"
        severity="danger"
        class="mx-4"
        label="Reset Game"
      />
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
          <PButton variant="text" severity="danger" icon="pi pi-trash" @click="removeWord(i)" />
        </div>
        <div class="flex">
          <FWordRow
            v-if="!gameOver"
            :word="currWord"
            key="curr"
            :size="size"
            v-model:state="currState"
          />
          <PButton variant="text" icon="pi pi-trash" disabled class="invisible" />
        </div>
        <PButton
          label="Submit"
          severity="info"
          :outlined="currWord.length !== size"
          :disabled="currWord.length !== size"
          :loading="solveWordleMutation.isPending.value"
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
