<script lang="ts" setup>
import '~/assets/scss/app/index.scss';
import { SETTINGS_QUERY } from '~/queries/settings';
import type { SETTINGS_QUERY_RESULT } from '~/types/sanity';


const { locale } = useI18n();
const { data } = await useSanityQuery<SETTINGS_QUERY_RESULT>(
  SETTINGS_QUERY, { locale }
);


usePageMeta().defaultValues.value = {
  ...composeSanitySeo(data.value?.seo).value,
};
</script>


<template>
<NuxtLayout>
  <NuxtPage />
</NuxtLayout>
</template>
