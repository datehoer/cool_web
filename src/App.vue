<template>
  <TopBar v-if="isLoggedIn"/>
  <router-view/>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TopBar from './components/TopBar.vue';

const store = useStore();
const isLoggedIn = computed(() => store.state.isLoggedIn);
</script>