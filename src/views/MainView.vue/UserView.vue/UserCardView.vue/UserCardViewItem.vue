<script setup lang="ts">
import * as Vue from 'vue';
import useAppFavoriteUser from '@/composables/useAppFavoriteUser';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { User } from '@/types';

const props = defineProps<{
  user: User;
}>();

const isFavoriteUser = useAppFavoriteUser(Vue.toRef(() => props.user));
</script>

<template lang="pug">

div.group.relative.aspect-square.bg-gray-200.cursor-pointer.select-none.overflow-hidden

  //- User picture
  img.w-full.h-full.object-cover.group-hover_scale-110.transition.duration-200(
    :src="user.picture.large"
  )

  //- User name
  div.absolute.bottom-0.left-0.right-0.text-xl.text-white.m-3(
    class="drop-shadow-[0_1px_3px_black] mr-[72px]"
  ) {{ user.name.first }} {{ user.name.last }}

  //- Favorite button
  FavoriteButton.absolute.bottom-0.right-0.text-5xl.m-3(
    v-model="isFavoriteUser"
  )

</template>
