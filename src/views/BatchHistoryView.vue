<template>
  <div>
    <BatchHistoryPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BatchHistoryPage from '../components/BatchHistoryPage.vue'

export default defineComponent({
  name: 'BatchHistoryView',
  components: { BatchHistoryPage }
})
</script>
