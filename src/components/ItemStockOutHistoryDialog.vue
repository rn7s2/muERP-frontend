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
      <a-table :columns="columns" :pagination="paginationProps"></a-table>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue'

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
          dataIndex: 'datetime'
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
      this.handleOk()
    }
  },
  mounted () {
    // Load history here.
  }
})
</script>
