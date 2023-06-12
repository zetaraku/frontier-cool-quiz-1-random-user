<script setup lang="ts">
import useAppGlobalState from '@/composables/useAppGlobalState';
import UserListViewItem from './UserListViewItem.vue';
import type { User } from '@/types';

defineProps<{
  users: User[];
}>();

const {
  currentInfoModalUser,
} = useAppGlobalState();
</script>

<template lang="pug">

div.flex.flex-col.gap-6

  TransitionGroup(name="list")

    UserListViewItem(
      v-for="user in users" :key="user.login.uuid"
      :user="user"
      @click="currentInfoModalUser = user;"
    )

</template>

<style scoped>
.list-move, .list-enter-active, .list-leave-active {
  pointer-events: none;
  transition: all 200ms;
}

.list-leave-active {
  display: none;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
  scale: 0.5;
}
</style>
