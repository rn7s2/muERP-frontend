<template>
  <div>
    <div v-if="isItemsReady">
      <div :style="{ margin: 'auto', width: '50%' }">
        <a-form-item label="搜索">
          <a-input v-model="searchText" placeholder="搜索（支持拼音首字母）……" />
        </a-form-item>
      </div>
      <a-table :style="{ margin: 'auto', width: '95%' }" :data="filteredItems" :pagination="paginationProps">
        <template #columns>
          <a-table-column title="序号" data-index="id" />
          <a-table-column title="名称" data-index="name" />
          <a-table-column title="规格" data-index="specification" />
          <a-table-column title="包装单位" data-index="unit" />
          <a-table-column title="生产商" data-index="manufacturer" />
          <a-table-column title="库存数量" data-index="number" />
          <a-table-column title="单价" data-index="price" />
          <a-table-column title="最早一批保质期" data-index="expiration" />
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-space>
                <a-button type="outline" @click="openItemDetailDialog(record)">详情 / 修改</a-button>
                <a-button type="primary" @click="openBatchAddDialog(record)">批次入库</a-button>
                <a-button type="primary" status="warning" @click="openStockOutDialog(record)">出库
                </a-button>
                <a-button type="outline" @click="openItemStockOutHistoryDialog(record)">出库历史</a-button>
                <a-popconfirm @ok="removeItem(record)">
                  <template #content>
                    删除该条目将同时删除进出库批次记录，
                    <br />
                    确定删除该条目吗？
                  </template>
                  <a-button type="primary" status="danger">删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <ItemDetailDialog :item="selectedItem" v-if="itemDetailDialogVisible" :visible="itemDetailDialogVisible" />
      <ItemStockOutHistoryDialog :item="selectedItem" v-if="itemStockOutHistoryDialogVisible"
        :visible="itemStockOutHistoryDialogVisible" />
      <BatchAddDialog :item="selectedItem" v-if="batchAddDialogVisible" :visible="batchAddDialogVisible" />
      <StockOutDialog :item="selectedItem" v-if="stockOutDialogVisible" :visible="stockOutDialogVisible" />
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
import ItemDetailDialog from '../components/ItemDetailDialog.vue'
import ItemStockOutHistoryDialog from '../components/ItemStockOutHistoryDialog.vue'
import BatchAddDialog from '../components/BatchAddDialog.vue'
import StockOutDialog from '@/components/StockOutDialog.vue'
import ApiClient from '@/plugins/api-client'

const ITEMS_PER_PAGE = 20

export default defineComponent({
  name: 'OverviewPage',
  data () {
    return {
      searchText: '',
      paginationProps: false,
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
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
          title: '库存数量',
          dataIndex: 'number'
        },
        {
          title: '单价',
          dataIndex: 'price'
        },
        {
          title: '最早一批保质期',
          dataIndex: 'expiration'
        },
        {
          title: '操作',
          slotName: 'operation',
          fixed: 'right',
          width: 390
        }
      ],
      filteredItems: [],
      selectedItem: null,
      itemDetailDialogVisible: false,
      itemStockOutHistoryDialogVisible: false,
      batchAddDialogVisible: false,
      stockOutDialogVisible: false
    }
  },
  methods: {
    filterItems () {
      this.filteredItems = this.$store.state.items.filter((item) => {
        const name = item.name.toUpperCase()
        const manufacturer = item.manufacturer.toUpperCase()
        const tmp = this.searchText.toUpperCase()
        return name.includes(tmp) || manufacturer.includes(tmp)
      })
      if (this.filteredItems.length <= ITEMS_PER_PAGE) {
        this.paginationProps = false
      } else {
        this.paginationProps = {
          total: this.filteredItems.length,
          defaultCurrent: 1,
          pageSize: ITEMS_PER_PAGE
        }
      }
    },
    refreshData () {
      ApiClient.getItems().then((res) => {
        this.$store.commit('setItems', res.data)
        this.filterItems()
      }).catch(err => this.$message.error('拉取项目失败：' + err.message))
      ApiClient.getBatchesAndItems().then(res => {
        this.$store.commit('setBatchesAndItems', res.data)
      }).catch(err => this.$message.error('拉取批次历史失败：' + err.message))
    },
    removeItem (item) {
      ApiClient.removeItem(item).then(res => {
        this.$message.success('删除项目成功')
        this.refreshData()
      }).catch(err => this.$message.error('删除项目失败：' + err.message))
    },
    openItemDetailDialog (item) {
      this.selectedItem = item
      this.itemDetailDialogVisible = true
    },
    closeItemDetailDialog () {
      this.itemDetailDialogVisible = false
      this.selectedItem = null
    },
    openItemStockOutHistoryDialog (item) {
      this.selectedItem = item
      this.itemStockOutHistoryDialogVisible = true
    },
    closeItemStockOutHistoryDialog () {
      this.itemStockOutHistoryDialogVisible = false
      this.selectedItem = null
    },
    openBatchAddDialog (item) {
      this.selectedItem = item
      this.batchAddDialogVisible = true
    },
    closeBatchAddDialog () {
      this.batchAddDialogVisible = false
      this.selectedItem = null
    },
    openStockOutDialog (item) {
      this.selectedItem = item
      this.stockOutDialogVisible = true
    },
    closeStockOutDialog () {
      this.stockOutDialogVisible = false
      this.selectedItem = null
    }
  },
  watch: {
    searchText () {
      this.filterItems()
    },
    isItemsReady () {
      this.filterItems()
    }
  },
  computed: {
    isItemsReady () {
      return this.$store.state.items !== null
    }
  },
  mounted () {
    if (this.isItemsReady === true) {
      this.filterItems()
    }
  },
  components: {
    ItemDetailDialog,
    ItemStockOutHistoryDialog,
    BatchAddDialog,
    StockOutDialog
  }
})
</script>
