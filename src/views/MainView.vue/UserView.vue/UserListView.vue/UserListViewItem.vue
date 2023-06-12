<script setup lang="ts">
import * as Vue from 'vue';
import { Icon } from '@iconify/vue';
import useAppFavoriteUser from '@/composables/useAppFavoriteUser';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { User } from '@/types';

const props = defineProps<{
  user: User;
}>();

const isFavoriteUser = useAppFavoriteUser(Vue.toRef(() => props.user));
</script>

<template lang="pug">

div.group.relative.flex.flex-row.items-center.shadow-lg.cursor-pointer.select-none

  //- Left div
  div.w-32.md_w-52.lg_w-60.aspect-square.shrink-0.overflow-hidden

    //- User picture
    img.w-full.h-full.object-cover.group-hover_scale-110.transition.duration-200(
      :src="user.picture.large"
    )

  //- Right div
  div.flex-auto.overflow-hidden.p-6.md_p-8

    div.relative.flex.flex-col.gap-3

      //- User name and handle
      div.flex.flex-col.md_flex-row.whitespace-nowrap.gap-3.md_mb-2
        span.font-semibold.text-3xl.text-black.truncate.flex-1 {{ user.name.first }} {{ user.name.last }}
        span.text-2xl.text-gray-400.truncate.shrink-0(class="mr-[50px] md_mr-0") @{{ user.login.username }}

      //- User email
      div.text-2xl.whitespace-nowrap.truncate.hidden.md_block
        Icon.inline.text-gray-400.mr-4(icon="mdi:email")
        span {{ user.email }}

      //- User cellphone
      div.text-2xl.whitespace-nowrap.truncate.hidden.md_block
        Icon.inline.text-gray-400.mr-4(icon="mdi:cellphone")
        span {{ user.cell }}

      //- User phone
      div.text-2xl.whitespace-nowrap.truncate.hidden.lg_block
        Icon.inline.text-gray-400.mr-4(icon="mdi:phone")
        span {{ user.phone }}

      //- Favorite button
      FavoriteButton.absolute.bottom-0.right-0.text-5xl.-mb-2.-mr-2(
        v-model="isFavoriteUser"
      )

</template>
