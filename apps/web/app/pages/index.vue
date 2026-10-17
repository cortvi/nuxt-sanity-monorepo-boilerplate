<script lang="ts" setup>
import '~/assets/scss/pages/home.scss';
import { HOME_QUERY } from '~/queries/home';
import type { HOME_QUERY_RESULT } from '~/types/sanity';


const { locale } = useI18n();
const { data: pageData } = await useSanityQuery<HOME_QUERY_RESULT>(
  HOME_QUERY, { locale }
);


usePageMeta(composeSanitySeo(pageData.value?.seo));
</script>


<template>
<div class="p-home">
  <h1>
    {{ pageData?.title }}
  </h1>
</div>
</template>
