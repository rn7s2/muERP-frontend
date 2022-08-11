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

<script>
import { defineComponent } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import ApiClient from './plugins/api-client'

export default defineComponent({
  name: 'App',
  components: {
    HeaderBar
  },
  created () {
    ApiClient.getItems().then((res) => {
      this.$store.commit('setItems', res.data)
    }).catch(err => this.$message.error('拉取项目失败：' + err.message))
  }
})
</script>
