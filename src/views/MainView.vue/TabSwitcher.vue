<script setup lang="ts">
import useAppGlobalState from '@/composables/useAppGlobalState';
import { availableTabs } from "@/settings";

const { currentTab } = useAppGlobalState();
</script>

<template lang="pug">

div.flex.flex-row.flex-wrap.gap-4.items-center

  span(v-for="tab in availableTabs").relative.inline-block.select-none

    a.text-blue-600.decoration-2.decoration-cyan-300.underline.underline-offset-8.transition(
      href="javascript:;"
      :class="{ 'opacity-40': tab.key !== currentTab }"
      @click="currentTab = tab.key;"
    ) {{ tab.name }}

    slot(name="decoration" :tab="tab")

</template>
