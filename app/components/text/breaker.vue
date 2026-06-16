<script lang="ts" setup>
defineProps<{
  text: string
}>();
</script>


<template>
<span class="c-text-breaker" :aria-label="text">
  <span class="char" v-for="(c, i) in text" :key="c + i" aria-hidden="true">
    {{ c }}
  </span>
</span>
</template>
