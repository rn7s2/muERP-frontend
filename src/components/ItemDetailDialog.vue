<template>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      Title
    </template>
    <div>You can cusstomize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.</div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemDetailDialog',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleOk () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
})
</script>
