<template>
  <div>
    <div v-if="isItemsReady">
      <div :style="{ margin: 'auto', width: '50%' }">
        <a-form-item label="搜索">
          <a-input v-model="searchText" placeholder="搜索（支持拼音首字母）……" />
        </a-form-item>
      </div>
      <a-table :style="{ margin: 'auto', width: '80%' }" :data="filteredItems" :columns="columns"
        :pagination="paginationProps">
        <template #operation="{ rowIndex }">
          <a-space>
            <a-button type="primary" @click="openItemDetailDialog(filteredItems[rowIndex])">详情 / 修改</a-button>
            <a-button type="primary" @click="openItemStockOutHistoryDialog(filteredItems[rowIndex])">出库历史</a-button>
            <a-popconfirm @ok="removeItem(filteredItems[rowIndex])">
              <template #content>
                删除该条目将同时删除进出库批次记录，
                <br />
                确定删除该条目吗？
              </template>
              <a-button type="primary" status="danger">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
      <ItemDetailDialog :item="selectedItem" v-if="itemDetailDialogVisible" :visible="itemDetailDialogVisible" />
      <ItemStockOutHistoryDialog :item="selectedItem" v-if="itemStockOutHistoryDialogVisible"
        :visible="itemStockOutHistoryDialogVisible" />
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
          dataIndex: 'expirationTime'
        },
        {
          title: '操作',
          slotName: 'operation'
        }
      ],
      filteredItems: [],
      selectedItem: null,
      itemDetailDialogVisible: false,
      itemStockOutHistoryDialogVisible: false
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
    ItemStockOutHistoryDialog
  }
})
</script>
