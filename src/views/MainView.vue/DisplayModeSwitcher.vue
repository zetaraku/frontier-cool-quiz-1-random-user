<script setup lang="ts">
import { Icon } from '@iconify/vue';
import useAppGlobalState from '@/composables/useAppGlobalState';
import { availableDisplayModes } from '@/settings';

const { currentDisplayMode } = useAppGlobalState();
</script>

<template lang="pug">

div.flex.flex-row.flex-wrap.items-center.gap-1

  button.rounded(
    v-for="displayMode in availableDisplayModes"
    :class="[displayMode.key === currentDisplayMode ? 'text-white bg-blue-500 shadow-md shadow-blue-300' : 'text-blue-500']"
    @click="currentDisplayMode = displayMode.key;"
  ).inline-grid.place-items-center.aspect-square.w-12.transition.cursor-pointer.text-4xl

    Icon(:icon="displayMode.icon")

</template>
