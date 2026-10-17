<script lang="ts" setup>
import type { NuxtError } from '#app';


const props = defineProps<{
  error: NuxtError
}>();


onMounted(() => console.error(props.error));

usePageMeta({ title: String(props.error.status || 404) });
</script>


<template>
<NuxtLayout>
  <!-- TODO: Style error page -->
  <section class="p-error | boxed-h">
    <div class="">
      {{ error.status || 404 }}
    </div>
  </section>
</NuxtLayout>
</template>


<style lang="scss">
.p-error
{
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >div
  {
    font-size: 120rem;
    line-height: 1;
  }
}
</style>
