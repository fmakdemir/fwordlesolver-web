import { getEmptyArray } from "@/common/arrays";
import { ref, watch, type Ref } from "vue";

export const useEditLogic = (size: Ref<number, number>) => {
  const words = ref<string[]>([]);
  const states = ref<number[][]>([]);
  const currWord = ref("");
  const currState = ref<number[]>([]);

  const handleKey = (key: string) => {
    console.log(key, words.value, states.value, currWord.value, currState.value);

    if (key === "Enter") {
      if (currWord.value.length === size.value) {
        words.value.push(currWord.value);
        states.value.push(currState.value);
        currWord.value = "";
        currState.value = getEmptyArray(size.value);
      }
    } else if (key === "Delete") {
      currWord.value = currWord.value.slice(0, -1);
    } else if (currWord.value.length < size.value) {
      currWord.value += key;
    }
  };

  const resetGame = () => {
    currWord.value = "";
    currState.value = getEmptyArray(size.value);
    words.value = [];
    states.value = [];
  };

  const removeWord = (ind: number) => {
    if (ind < -1 || ind >= words.value.length) {
      console.error("Invalid deleteWord index: " + ind);
      return;
    }
    words.value.splice(ind, 1);
    states.value.splice(ind, 1);
  };

  watch(
    () => size,
    () => resetGame(),
  );
  return { words, states, currWord, currState, resetGame, removeWord, handleKey };
};
