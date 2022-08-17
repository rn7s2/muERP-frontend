<template>
  <div>
    <div :style="{ margin: 'auto', width: '95%' }" v-if="isStockOutAndItemsReady">
      <a-form-item label="选择时间范围">
        <a-range-picker mode="date" v-model="timeRange" />
      </a-form-item>
      <a-table :data="stockOutAndItems" :columns="columns" :pagination="paginationProps" />
    </div>
    <div style="text-align:center;" v-else>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <a-spin dot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ApiClient from '@/plugins/api-client'

const ITEMS_PER_PAGE = 20

export default defineComponent({
  name: 'StockOutHistoryView',
  data () {
    return {
      paginationProps: false,
      columns: [
        {
          title: '库存编号',
          dataIndex: 'item_id'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '规格',
          dataIndex: 'specification'
        },
        {
          title: '包装单位',
          dataIndex: 'unit'
        },
        {
          title: '生产商',
          dataIndex: 'manufacturer'
        },
        {
          title: '单价',
          dataIndex: 'price'
        },
        {
          title: '时间范围内出库数量',
          dataIndex: 'number'
        }
      ],
      timeRange: undefined
    }
  },
  methods: {
    refreshData () {
      if (this.timeRange && this.timeRange[0] && this.timeRange[1]) {
        ApiClient.getStockOutAndItems(this.timeRange[0], this.timeRange[1]).then(res => {
          this.$store.commit('setStockOutAndItems', res.data)
          if (this.stockOutAndItems.length <= ITEMS_PER_PAGE) {
            this.paginationProps = false
          } else {
            this.paginationProps = {
              total: this.stockOutAndItems.length,
              defaultCurrent: 1,
              pageSize: ITEMS_PER_PAGE
            }
          }
        }).catch(err => this.$message.error('拉取出库历史失败：' + err.message))
      }
    },
    subtractDays (numOfDays, date = new Date()) {
      date.setDate(date.getDate() - numOfDays)
      return date
    },
    dateToString (date) {
      date = new Date(date)
      var dd = String(date.getDate()).padStart(2, '0')
      var mm = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
      var yyyy = date.getFullYear()
      return yyyy + '-' + mm + '-' + dd
    }
  },
  watch: {
    timeRange () {
      this.refreshData()
    }
  },
  computed: {
    stockOutAndItems () {
      return this.$store.state.stockOutAndItems
    },
    isStockOutAndItemsReady () {
      return this.$store.state.stockOutAndItems !== null
    }
  },
  mounted () {
    this.$store.commit('setStockOutAndItems', null)
    this.timeRange = [this.dateToString(this.subtractDays(30)), this.dateToString(new Date())]
    this.refreshData()
  }
})
</script>
