<script setup lang="ts">
import useAppGlobalState from '@/composables/useAppGlobalState';
import { availablePageSizes } from "@/settings";

const { currentPageSize } = useAppGlobalState();
</script>

<template lang="pug">

select.rounded.text-xl.bg-white.border-2.border-gray-300.px-3.py-2.cursor-pointer(
  v-model="currentPageSize"
)

  option(v-for="pageSize in availablePageSizes" :value="pageSize.key") {{ pageSize.name }}

</template>
