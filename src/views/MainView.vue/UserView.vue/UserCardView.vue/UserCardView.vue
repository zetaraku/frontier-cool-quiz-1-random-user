<script setup lang="ts">
import useAppGlobalState from '@/composables/useAppGlobalState';
import UserCardViewItem from './UserCardViewItem.vue';
import type { User } from '@/types';

defineProps<{
  users: User[];
}>();

const {
  currentInfoModalUser,
} = useAppGlobalState();
</script>

<template lang="pug">

div.grid.grid-cols-2.md_grid-cols-3.lg_grid-cols-4.xl_grid-cols-5.gap-6

  TransitionGroup(name="card")

    UserCardViewItem(
      v-for="user in users" :key="user.login.uuid"
      :user="user"
      @click="currentInfoModalUser = user;"
    )

</template>

<style scoped>
.card-move, .card-enter-active, .card-leave-active {
  pointer-events: none;
  transition: all 200ms;
}

.card-leave-active {
  display: none;
}

.card-enter-from, .card-leave-to {
  opacity: 0;
  scale: 0.5;
}
</style>
