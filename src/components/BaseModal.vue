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

//- full-screen wrapper
div(v-show="modelValue").fixed.top-0.bottom-0.left-0.right-0.z-40

  Transition(name="backdrop")

    //- backdrop
    div.absolute.top-0.bottom-0.left-0.right-0(
      v-show="modelValue"
      class="bg-black/50"
      @click="$emit('update:modelValue', false);"
    )

  //- dialog wrapper
  div.w-full.h-full.grid.place-items-center.p-6

    Transition(name="modal")

      //- dialog
      div.relative.rounded-lg.min-w-md.max-w-xl.bg-white.p-8.shadow-xl.max-h-full.overflow-y-auto(
        v-show="modelValue"
      )

        //- content
        slot

        //- close button
        button.absolute.top-0.right-0.text-4xl.m-4.text-gray-600.opacity-60.hover_opacity-100.transition(
          @click="$emit('update:modelValue', false);"
        )

          Icon.drop-shadow(icon="mdi:close")

</template>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: all 150ms;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  pointer-events: none;
  transition: all 150ms;
}

.modal-enter-from,
.modal-leave-to {
  scale: 0;
  opacity: 0;
}
</style>
