<script setup lang="ts">
import { useEditLogic } from "@/components/EditLogic";
import FKeyboard from "@/components/FKeyboard.vue";
import FSelectSize from "@/components/FSelectSize.vue";
import FWordRow from "@/components/FWordRow.vue";
import { ref, watch } from "vue";
import { STATES } from "@/common/constants";
import { getEmptyArray } from "@/common/arrays";
import { fwordlesolverApiApiSolveWordle, type WordleSolveResponse } from "@/api";

const size = ref(5);
const resp = ref<WordleSolveResponse>({
  alternatives: ["ASDDD", "BASDD", "QWEHK", "YQOWE", "OASDA"],
  suggestions: ["ASDDD", "BASDD", "QWEHK", "YQOWE", "OASDA"],
  remaining: 0,
  used_letters: ["a", "b", "d"],
});

const { words, states, currWord, currState, handleKey } = useEditLogic(size);

watch(
  () => words.value.length,
  async () => {
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
