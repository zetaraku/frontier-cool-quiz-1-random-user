<script setup lang="ts">
import * as Vue from 'vue';
import { Icon } from '@iconify/vue';
import useAppGlobalState from '@/composables/useAppGlobalState';
import useAppFavoriteUser from '@/composables/useAppFavoriteUser';
import BaseModal from '@/components/BaseModal.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';

const {
  currentInfoModalUser: user,
} = useAppGlobalState();

const isFavoriteUser = useAppFavoriteUser(user);

const isModalOpen = Vue.computed({
  get(): boolean {
    return user.value !== null;
  },
  set(value: boolean) {
    user.value = (value ? user.value : null);
  },
});
</script>

<template lang="pug">

BaseModal(v-model="isModalOpen")

  template(v-if="user !== null")

    //- upper div
    div.relative

      //- user picture
      div.w-52.h-52.overflow-hidden

        img.w-full.h-full.object-cover(
          :src="user.picture.large"
        )

      //- favorite button
      FavoriteButton.absolute.bottom-0.right-0.text-5xl(
        v-model="isFavoriteUser"
      )

    hr.my-5

    //- middle div
    div.relative.flex.flex-col.gap-4.flex-1

      //- user info
      div.mb-2
        span.font-semibold.text-3xl.text-black {{ user.name.first }} {{ user.name.last }}
        span.text-2xl.text-gray-400.ml-3 @{{ user.login.username }}
      div.flex.text-xl
        span: Icon.inline.text-gray-400.mr-4(icon="mdi:email")
        span {{ user.email }}
      div.flex.text-xl
        span: Icon.inline.text-gray-400.mr-4(icon="mdi:cellphone")
        span {{ user.cell }}
      div.flex.text-xl
        span: Icon.inline.text-gray-400.mr-4(icon="mdi:phone")
        span {{ user.phone }}
      div.flex.text-xl
        span: Icon.inline.text-gray-400.mr-4(icon="mdi:map-marker-outline")
        span
          | {{ user.location.street.number }} {{ user.location.street.name }},
          | {{ user.location.city }},
          | {{ user.location.state }},
          | {{ user.location.postcode }},
          | {{ user.location.country }}

    hr.my-5

    //- bottom div
    div

      //- lorem60
      span
        | Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel corporis nobis ipsam adipisci ex explicabo in aliquam inventore, dolorem ad, nihil quod facere odit quidem unde quaerat. Qui, pariatur! Iste, assumenda! Rerum tenetur temporibus laboriosam mollitia totam aperiam voluptates est maxime neque minima alias odio veniam, praesentium quaerat nostrum doloremque perspiciatis aspernatur, sit excepturi nesciunt dignissimos unde nam. Vel, suscipit.

</template>
