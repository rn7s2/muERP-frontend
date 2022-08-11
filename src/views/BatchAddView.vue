<template>
  <div>
    <BatchAddPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BatchAddPage from '../components/BatchAddPage.vue'

export default defineComponent({
  name: 'BatchAddView',
  components: {
    BatchAddPage
  }
})
</script>
