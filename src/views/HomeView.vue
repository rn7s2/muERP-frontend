<template>
  <div>
    <OverviewPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OverviewPage from '@/components/OverviewPage.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    OverviewPage
  }
})
</script>
