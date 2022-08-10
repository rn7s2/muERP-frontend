<template>
  <a-page-header subtitle="简单粗暴地管理库存" :show-back="false">
    <template #title>
      <a-button type="text" @click="to('/')">
        <span :style="{ fontSize: 'large', fontWeight: 'bold' }">StockerVue</span>
      </a-button>
    </template>
    <template #extra>
      <a-button-group type="primary">
        <a-button @click="to('/')">库存概览</a-button>
        <a-button @click="to('/batch-add')">批次入库</a-button>
        <a-button @click="to('/batch-history')">批次历史</a-button>
      </a-button-group>
    </template>
  </a-page-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderBar',
  methods: {
    to (link: string) {
      this.$router.push({ path: link })
    }
  }
})
</script>
