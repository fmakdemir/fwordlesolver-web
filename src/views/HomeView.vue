<script setup lang="ts">
import { useEditLogic } from "@/components/EditLogic";
import FKeyboard from "@/components/FKeyboard.vue";
import FSelectSize from "@/components/FSelectSize.vue";
import FWordRow from "@/components/FWordRow.vue";
import { ref, watch, watchEffect } from "vue";
import { STATES } from "@/common/constants";
import { getEmptyArray } from "@/common/arrays";
import { fwordlesolverApiApiSolveWordle, type WordleSolveResponse } from "@/api";
import FSuggestions from "@/components/FSuggestions.vue";

const size = ref(5);
const resp = ref<WordleSolveResponse>({
  alternatives: [],
  suggestions: [],
  remaining: 0,
  used_letters: [],
});

const { words, states, currWord, currState, handleKey } = useEditLogic(size);

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
  const results = await fwordlesolverApiApiSolveWordle({
    words: words.value,
    places,
    size: size.value,
  });
  console.log("New value added", words.value, places, results);
  resp.value = results.data;
};

watch(() => words.value.length, fetchSuggestions);

watchEffect(() => fetchSuggestions());

const onSuggest = (word: string) => {
  currWord.value = word;
  currState.value = getEmptyArray(size.value);
};
</script>

<template>
  <main>
    <FSelectSize v-model="size" />
    <div class="flex flex-wrap items-center justify-center">
      <div class="mx-10 mb-4 flex flex-col pt-16">
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
