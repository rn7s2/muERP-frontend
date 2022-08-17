<template>
  <a-modal width="600px" :visible="visible" :draggable="true" @ok="handleOk" @cancel="handleCancel" :hide-cancel="true">
    <template #title>
      出库历史 {{ item.name }}
    </template>
    <div>
      <a-form>
        <a-form-item label="选择时间范围">
          <a-range-picker mode="date" />
        </a-form-item>
        <a-form-item label="范围内出库总数">
          <a-input-number v-model="rangeNumber" read-only />
        </a-form-item>
      </a-form>
      <a-table :data="stockOutHistory" :columns="columns" :pagination="paginationProps"></a-table>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue'
import ApiClient from '@/plugins/api-client'

export default defineComponent({
  name: 'ItemStockOutHistoryDialog',
  props: ['visible', 'item'],
  data () {
    return {
      stockOutHistory: [],
      rangeNumber: 0,
      paginationProps: false,
      columns: [
        {
          title: '时间',
          dataIndex: 'date'
        },
        {
          title: '出库数量',
          dataIndex: 'number'
        }
      ]
    }
  },
  methods: {
    handleOk () {
      this.$parent.closeItemStockOutHistoryDialog()
    },
    handleCancel () {
      this.$parent.closeItemStockOutHistoryDialog()
    }
  },
  mounted () {
    ApiClient.getStockOutByItemId(this.item.id).then(res => {
      this.stockOutHistory = res.data
      this.rangeNumber = 0
      res.data.forEach(element => {
        this.rangeNumber += element.number
      })
    }).catch(err => this.$message.error('拉取出库记录失败：' + err.message))
  }
})
</script>
