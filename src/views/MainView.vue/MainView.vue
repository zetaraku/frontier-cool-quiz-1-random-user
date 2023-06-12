<script setup lang="ts">
import * as Vue from 'vue';
import * as VueUse from '@vueuse/core';
import { Icon } from '@iconify/vue';
import sleep from 'sleep-promise';
import useAppGlobalState from '@/composables/useAppGlobalState';
import usePagination from '@/composables/usePagination';
import Badge from '@/components/Badge.vue';
import Pagination from '@/components/Pagination.vue';
import TabSwitcher from './TabSwitcher.vue';
import PageSizeSwitcher from './PageSizeSwitcher.vue';
import DisplayModeSwitcher from './DisplayModeSwitcher.vue';
import UserView from './UserView.vue';
import UserInfoModal from './UserInfoModal.vue';
import { pickUniqueItems } from '@/utils';

// Global states

const {
  currentTab,
  currentPageSize,
  currentDisplayMode,
  allUsers,
  isUsersDataLoading,
  usersDataError,
  favoriteUsers,
} = useAppGlobalState();

// Filtered users

const filteredUsersTabs = Vue.reactive({
  all: Vue.computed(() => allUsers.value.slice()),
  male: Vue.computed(() => allUsers.value.filter((user) => user.gender === 'male')),
  female: Vue.computed(() => allUsers.value.filter((user) => user.gender === 'female')),
  favorite: Vue.computed(() => allUsers.value.filter((user) => favoriteUsers.value.has(user))),
});
const filteredUsers = Vue.computed(() => filteredUsersTabs[currentTab.value]);

const favoriteUsersLength = Vue.computed(() => filteredUsersTabs.favorite.length);

// Pagination

const {
  pageNo: currentPageNo,
  pagesCount: currentPageCount,
  paginatedItems: paginatedUsers,
} = usePagination(filteredUsers, currentPageSize);

// Ensure main content y-paddings

const headerElementRef = Vue.ref<HTMLElement>();
const footerElementRef = Vue.ref<HTMLElement>();
const { height: headerHeight } = VueUse.useElementSize(headerElementRef);
const { height: footerHeight } = VueUse.useElementSize(footerElementRef);

const mainContentPaddings = Vue.computed(() => ({
  'padding-top': `${headerHeight.value + 32}px`,
  'padding-bottom': `${footerHeight.value + 32}px`,
}));

// Test utils

async function pickRandomUsersForMe() {
  const pickedUserSet = new Set(pickUniqueItems(allUsers.value, 12));
  const pickedUsers = allUsers.value.filter((user) => pickedUserSet.has(user));

  for (const user of pickedUsers) {
    favoriteUsers.value.add(user);
    await sleep(200);
  }
}
</script>

<template lang="pug">

header.fixed.top-0.left-0.right-0.bg-white.z-10.shadow-md(ref="headerElementRef")

  div.container.mx-auto.p-8

    div.flex.flex-row.flex-wrap.justify-between.gap-6.text-3xl

      div.block

        //- tabs
        TabSwitcher

          template(#decoration="{ tab }")

            Badge.text-white.bg-red-500(v-if="tab.key === 'favorite' && favoriteUsersLength > 0")
              | {{ favoriteUsersLength }}

      div.flex.gap-4.items-center

        //- items per page
        PageSizeSwitcher

        //- display mode
        DisplayModeSwitcher

main.static

  div.container.mx-auto.px-8.min-h-screen(
    :style="{ ...mainContentPaddings }"
  )

    UserView(
      :mode="currentDisplayMode"
      :users="paginatedUsers"
    )

      template(#placeholder)

        div.max-w-xl

          span(v-if="isUsersDataLoading")
            Icon.inline.text-4xl.mr-4.mb-1.animate-spin(icon="mdi:loading")
            | Loading users ...

          span(v-else-if="usersDataError").text-red-500
            Icon.inline.text-4xl.mr-4.mb-1(icon="mdi:alert-circle-outline")
            | {{ usersDataError }}

          span(v-else-if="currentTab === 'favorite'")
            | You have no favorite user yet.
            br
            | Try go #[a.font-semibold.text-blue-500.underline(href="javascript:;" @click="pickRandomUsersForMe") adding some] :)

          span(v-else)
            | No user.

footer.fixed.bottom-0.left-0.right-0.bg-white.z-10(ref="footerElementRef")

  div.container.mx-auto.p-8

    Pagination(
      v-model:currentPageNo="currentPageNo"
      :pagesCount="currentPageCount"
    )

teleport(to="#app")

  UserInfoModal

</template>
