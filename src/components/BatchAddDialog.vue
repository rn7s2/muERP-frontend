<template>
  <a-modal width="600px" :visible="visible" :draggable="true" ok-text="批次入库" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      批次入库 {{ item.name }}
    </template>
    <BatchAddBox :batch="newBatch" :isInDialog="true" />
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue'
import BatchAddBox from './BatchAddBox.vue'
import ApiClient from '@/plugins/api-client'

export default defineComponent({
  name: 'BatchAddDialog',
  props: ['visible', 'item'],
  data () {
    return {
      newBatch: {
        date: (() => {
          var today = new Date()
          var dd = String(today.getDate()).padStart(2, '0')
          var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
          var yyyy = today.getFullYear()

          today = yyyy + '-' + mm + '-' + dd
          return today
        })(),
        name: this.item.name,
        specification: this.item.specification,
        unit: this.item.unit,
        manufacturer: this.item.manufacturer,
        number: 1,
        price: this.item.price,
        expiration: '',
        vendor: ''
      }
    }
  },
  methods: {
    handleOk () {
      if (this.newBatch.expiration === '') {
        this.$message.warning('请输入保质期！')
        return
      }
      ApiClient.addBatch({
        id: 0,
        date: this.newBatch.date,
        number: this.newBatch.number,
        expiration: this.newBatch.expiration,
        vendor: this.newBatch.vendor,
        disabled: 0,
        item_id: this.item.id
      }).then(res => {
        this.$message.success('添加批次成功')
        this.$parent.closeBatchAddDialog()
        this.$parent.refreshData()
      }).catch(err => this.$message.error('添加批次失败：' + err.message))
    },
    handleCancel () {
      this.$parent.closeBatchAddDialog()
    }
  },
  components: { BatchAddBox }
})
</script>
