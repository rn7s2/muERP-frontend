<template>
  <a-modal width="600px" :visible="visible" :draggable="true" ok-text="批次入库" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      批次入库 {{ item.name }}
    </template>
    <BatchAddBox :batch="newBatch" :isInDialog="true" />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BatchAddBox from './BatchAddBox.vue'

export default defineComponent({
  name: 'BatchAddDialog',
  props: ['visible', 'item'],
  data () {
    return {
      newBatch: {
        date: Date.now(),
        name: this.item.name,
        specification: this.item.specification,
        unit: this.item.unit,
        manufacturer: this.item.manufacturer,
        number: 0,
        price: this.item.price,
        sn: '',
        expirationTime: '',
        vendor: ''
      }
    }
  },
  methods: {
    handleOk () {
      (this as any).$parent.closeBatchAddDialog()
    },
    handleCancel () {
      (this as any).$parent.closeBatchAddDialog()
    }
  },
  components: { BatchAddBox }
})
</script>
