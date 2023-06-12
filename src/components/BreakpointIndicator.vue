<script setup lang="ts">
import * as Vue from 'vue';
import * as VueUse from '@vueuse/core';

const breakpoints = VueUse.useBreakpoints(VueUse.breakpointsTailwind);
const currentBreakpoints = breakpoints.current();
const currentBreakpoint = Vue.computed(() => currentBreakpoints.value.slice(-1)[0] ?? 'xs');
</script>

<template lang="pug">

span.font-mono.text-3xl.p-3
  | {{ currentBreakpoint }}

</template>
