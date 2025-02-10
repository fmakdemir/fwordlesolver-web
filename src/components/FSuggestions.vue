<template>
  <div class="flex flex-col items-center">
    <div>
      <h2 class="flex items-center">
        <button @click="toggle" class="flex cursor-pointer px-2 py-1">
          Word Suggestions (remaining)
          {{ hidden ? "Show" : "Hide" }}
          <div :class="hidden ? 'rotate-180' : 'rotate-0'" class="transition-transform">🔽</div>
        </button>
      </h2>
    </div>
    <div class="flex" :class="{ hidden }">
      <div class="flex flex-col">
        <button v-for="(w, i) in suggestions" :key="i" @click="suggest(w)" class="btn-sugg">
          {{ w }}
        </button>
      </div>
      <div class="flex flex-col">
        <button v-for="(w, i) in alternatives" :key="i" @click="suggest(w)" class="btn-sugg">
          {{ w }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{ suggestions: string[]; alternatives: string[]; remaining: number }>();

const emit = defineEmits<{ suggest: [word: string] }>();

const hidden = ref(false);

const suggest = (word: string) => emit("suggest", word);

const toggle = () => (hidden.value = !hidden.value);
</script>
