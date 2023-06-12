<script setup lang="ts">
import * as Vue from 'vue';
import * as VueUse from '@vueuse/core';
import { computePagination } from '@/composables/usePagination';

const props = defineProps<{
  pagesCount: number;
  currentPageNo: number;
}>();

const emit = defineEmits<{
  (event: 'update:currentPageNo', value: number): void;
}>();

const breakpoints = VueUse.useBreakpoints(VueUse.breakpointsTailwind);
const mdAndUp = breakpoints.greaterOrEqual('md');

const currentDisplayRange = Vue.computed(() => {
  if (mdAndUp.value) return 1;
  return 0;
});

const pagination = Vue.computed(() => computePagination(props.pagesCount, props.currentPageNo, currentDisplayRange.value));

function setPage(pageNo: number) {
  emit('update:currentPageNo', pageNo);
}
function prevPage() {
  emit('update:currentPageNo', Math.max(1, props.currentPageNo - 1));
}
function nextPage() {
  emit('update:currentPageNo', Math.min(props.currentPageNo + 1, props.pagesCount));
}
</script>

<template lang="pug">

div.flex.flex-row.flex-wrap.justify-center.gap-4

  //- prev
  button(@click="prevPage").inline-grid.place-items-center.aspect-square.w-12.bg-gray-300 {{ '<' }}

  //- pages
  button(
    v-for="pageNo in pagination"
    :class="[pageNo === currentPageNo ? 'bg-blue-500 text-white' : 'bg-gray-200']"
    @click="setPage(pageNo || currentPageNo);"
  ).inline-grid.place-items-center.aspect-square.w-12 {{ pageNo || '...' }}

  //- next
  button(@click="nextPage").inline-grid.place-items-center.aspect-square.w-12.bg-gray-300 {{ '>' }}

</template>
