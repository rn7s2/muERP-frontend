<template>
  <a-page-header subtitle="简单粗暴地管理库存" :show-back="false">
    <template #title>
      <a-button type="text" @click="to('/')">
        <span :style="{ fontSize: 'large', fontWeight: 'bold' }">StockerVue</span>
      </a-button>
    </template>
    <template #extra>
      <a-space>
        <a-button :type="getButtonType('home')" @click="to('/')">库存概览</a-button>
        <a-button :type="getButtonType('batch-add')" @click="to('/batch-add')">批次入库</a-button>
        <a-button :type="getButtonType('stock-out-history')" @click="to('/stock-out-history')">出库总表</a-button>
        <a-button :type="getButtonType('batch-history')" @click="to('/batch-history')">批次历史</a-button>
      </a-space>
    </template>
  </a-page-header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderBar',
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  },
  methods: {
    to (link) {
      this.$router.push({ path: link })
    },
    getButtonType (name) {
      if (name === this.currentRouteName) {
        return 'primary'
      } else {
        return 'outline'
      }
    }
  }
})
</script>
