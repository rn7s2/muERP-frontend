<template>
  <a-modal width="600px" :visible="visible" :draggable="true" @ok="handleOk" @cancel="handleCancel" :hide-cancel="true">
    <template #title>
      出库历史 {{ item.name }}
    </template>
    <div>
      <a-form>
        <a-form-item label="选择时间范围">
          <a-range-picker mode="date" v-model="timeRange" />
        </a-form-item>
        <a-form-item label="范围内出库总数">
          <a-input-number v-model="rangeNumber" read-only />
        </a-form-item>
      </a-form>
      <a-table :data="filteredStockOutHistory" :columns="columns" :pagination="paginationProps"></a-table>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue'
import ApiClient from '@/plugins/api-client'

const ITEMS_PER_PAGE = 20

export default defineComponent({
  name: 'ItemStockOutHistoryDialog',
  props: ['visible', 'item'],
  data () {
    return {
      timeRange: undefined,
      rangeNumber: 0,
      filteredStockOutHistory: [],
      paginationProps: false,
      stockOutHistory: [],
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
  watch: {
    timeRange () {
      this.filterStockOutHistory()
    }
  },
  methods: {
    filterStockOutHistory () {
      if (this.timeRange && this.timeRange[0] && this.timeRange[1]) {
        this.filteredStockOutHistory = this.stockOutHistory.filter(element => {
          return Date.parse(element.date) >= Date.parse(this.timeRange[0]) && Date.parse(element.date) <= Date.parse(this.timeRange[1])
        })
      } else {
        this.filteredStockOutHistory = this.stockOutHistory
      }
      this.rangeNumber = 0
      this.filteredStockOutHistory.forEach(element => {
        this.rangeNumber += element.number
      })
      if (this.filteredStockOutHistory.length <= ITEMS_PER_PAGE) {
        this.paginationProps = false
      } else {
        this.paginationProps = {
          total: this.filteredStockOutHistory.length,
          defaultCurrent: 1,
          pageSize: ITEMS_PER_PAGE
        }
      }
    },
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
      this.filterStockOutHistory()
    }).catch(err => this.$message.error('拉取出库记录失败：' + err.message))
  }
})
</script>
