import * as Vue from 'vue';
import * as VueUse from '@vueuse/core';
import {
  availableTabs, defaultTab, type TabKey,
  availablePageSizes, defaultPageSize, type PageSizeKey,
  availableDisplayModes, defaultDisplayMode, type DisplayModeKey,
} from '@/settings';
import { getTestUsers } from '@/utils';
import type { User } from '@/types';

export default VueUse.createGlobalState(() => {
  const currentTab = VueUse.useLocalStorage<TabKey>('currentTab', defaultTab);
  const currentPageSize = VueUse.useLocalStorage<PageSizeKey>('currentPageSize', defaultPageSize);
  const currentDisplayMode = VueUse.useLocalStorage<DisplayModeKey>('currentDisplayMode', defaultDisplayMode);

  // fix invalid states
  if (!availableTabs.some((tab) => tab.key === currentTab.value)) {
    currentTab.value = defaultTab;
  }
  if (!availablePageSizes.some((pageSize) => pageSize.key === currentPageSize.value)) {
    currentPageSize.value = defaultPageSize;
  }
  if (!availableDisplayModes.some((displayMode) => displayMode.key === currentDisplayMode.value)) {
    currentDisplayMode.value = defaultDisplayMode;
  }

  const {
    state: allUsers,
    isLoading: isUsersDataLoading,
    error: usersDataError,
  } = VueUse.useAsyncState(getTestUsers(), []);

  const favoriteUsers = Vue.ref<Set<User>>(new Set());

  const currentInfoModalUser = Vue.ref<User | null>(null);

  return {
    currentTab,
    currentPageSize,
    currentDisplayMode,
    allUsers,
    isUsersDataLoading,
    usersDataError,
    favoriteUsers,
    currentInfoModalUser,
  };
});
