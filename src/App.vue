<template>
  <a-layout>
    <a-layout-header>
      <HeaderBar />
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderBar from './components/HeaderBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderBar
  }
})
</script>
