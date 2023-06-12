<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();
</script>

<template lang="pug">

button.hover_scale-125.transition(
  @click.stop="$emit('update:modelValue', !modelValue);"
)

  Icon.text-gray-400.transition(icon="mdi:heart-outline" :class="{ 'opacity-0': modelValue }")
  Icon.text-red-500.transition(icon="mdi:heart" :class="{ 'opacity-0': !modelValue }").absolute.top-0.bottom-0.left-0.right-0

</template>
