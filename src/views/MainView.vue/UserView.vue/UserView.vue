<script setup lang="ts">
import * as Vue from 'vue';
import UserCardView from './UserCardView.vue';
import UserListView from './UserListView.vue';
import UserPlaceholderView from './UserPlaceholderView.vue';
import { type DisplayModeKey } from "@/settings";
import type { User } from '@/types';

defineProps<{
  mode: DisplayModeKey;
  users: User[];
}>();

const components = {
  card: Vue.markRaw(UserCardView),
  list: Vue.markRaw(UserListView),
} satisfies Record<DisplayModeKey, Vue.Component>;
</script>

<template lang="pug">

component(
  v-if="users.length > 0"
  :is="components[mode]"
  :users="users"
)

UserPlaceholderView(
  v-else
)

  slot(name="placeholder")

</template>

<style>
html {
  /* always display the scrollbar */
  overflow-y: scroll;
}
</style>
