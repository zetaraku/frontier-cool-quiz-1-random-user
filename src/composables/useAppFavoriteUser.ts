import * as Vue from 'vue';
import useAppGlobalState from '@/composables/useAppGlobalState';
import type { User } from '@/types';

const { favoriteUsers } = useAppGlobalState();

export default function useAppFavoriteUser(user: Vue.Ref<User | null>) {
  const isFavoriteUser = Vue.computed({
    get: () => {
      if (user.value === null) return false;

      return favoriteUsers.value.has(user.value);
    },
    set: (value) => {
      if (user.value === null) return;

      if (value) {
        favoriteUsers.value.add(user.value);
      } else {
        favoriteUsers.value.delete(user.value);
      }
    },
  });

  return isFavoriteUser;
}
