<script lang="ts" setup>
import '~/assets/scss/app/index.scss';


const runtimeConfig = useRuntimeConfig();

/* TODO: Add SEO meta data */
usePageMeta({
  title: 'Nuxt Boilerplate',
  // description: '',
  image: runtimeConfig.public.siteUrl + '/thumbnail.png',
});
</script>


<template>
<NuxtLayout>
  <NuxtPage />
</NuxtLayout>
</template>
