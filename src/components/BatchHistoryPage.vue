<template>
  <div>
    <div v-if="isItemsReady">
      <a-table :style="{ margin: 'auto', width: '80%' }" :data="filteredItems" :columns="columns"
        :pagination="paginationProps">
        <template #operation="{ rowIndex }">
          <a-popconfirm @ok="removeItem(filteredItems[rowIndex])">
            <template #content>
              删除该条目将同时删除进出库批次记录，
              <br />
              确定删除该条目吗？
            </template>
            <a-button type="primary" status="danger">废弃</a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <ItemDetailDialog :item="selectedItem" v-if="itemDetailDialogVisible" :visible="itemDetailDialogVisible" />
      <ItemStockOutHistoryDialog :item="selectedItem" v-if="itemStockOutHistoryDialogVisible"
        :visible="itemStockOutHistoryDialogVisible" />
      <BatchAddDialog :item="selectedItem" v-if="batchAddDialogVisible" :visible="batchAddDialogVisible" />
    </div>
    <center v-else>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <a-spin dot />
    </center>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ItemDetailDialog from '../components/ItemDetailDialog.vue'
import ItemStockOutHistoryDialog from '../components/ItemStockOutHistoryDialog.vue'
import BatchAddDialog from '../components/BatchAddDialog.vue'

const ITEMS_PER_PAGE = 20

export default defineComponent({
  name: 'BatchHistoryPage',
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
          title: '日期',
          dataIndex: 'date'
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
          title: '数量',
          dataIndex: 'number'
        },
        {
          title: '单价',
          dataIndex: 'price'
        },
        {
          title: '批号',
          dataIndex: 'sn'
        },
        {
          title: '保质期',
          dataIndex: 'expirationTime'
        },
        {
          title: '供货商',
          dataIndex: 'vendor'
        },
        {
          title: '操作',
          slotName: 'operation',
          fixed: 'right',
          width: 100
        }
      ],
      filteredItems: [],
      selectedItem: null,
      itemDetailDialogVisible: false,
      itemStockOutHistoryDialogVisible: false,
      batchAddDialogVisible: false
    }
  },
  methods: {
    filterItems () {
      this.filteredItems = this.$store.getters.getItems.filter((item) => {
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
    removeItem (item) {
      console.log(item)
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
    BatchAddDialog
  }
})
</script>
