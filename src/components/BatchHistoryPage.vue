<template>
  <div>
    <div v-if="isBatchesAndItemsReady">
      <div :style="{ margin: 'auto', width: '50%' }">
        <a-form-item label="搜索">
          <a-input v-model="searchText" placeholder="搜索（支持拼音首字母）……" />
        </a-form-item>
      </div>
      <a-table :style="{ margin: 'auto', width: '95%' }" :data="batchesAndItems" :pagination="paginationProps">
        <template #columns>
          <a-table-column title="序号" data-index="id" />
          <a-table-column title="日期" data-index="date" />
          <a-table-column title="名称" data-index="name" />
          <a-table-column title="规格" data-index="specification" />
          <a-table-column title="包装单位" data-index="unit" />
          <a-table-column title="生产商" data-index="manufacturer" />
          <a-table-column title="数量" data-index="number" />
          <a-table-column title="单价" data-index="price" />
          <a-table-column title="保质期">
            <template #cell="{ record }">
              <span :style="getColorStyle(record)">{{ record.expiration }}</span>
            </template>
          </a-table-column>
          <a-table-column title="供货商" data-index="vendor" />
          <a-table-column title="操作">
            <template #cell="{ record }">
              <div v-if="record.disabled === 1">
                <span :style="{ color: 'red' }">批次已废弃</span>
              </div>
              <a-popconfirm v-else @ok="disableBatch(record.id)">
                <template #content>
                  废弃该批次将不再追踪该批次的保质期，
                  <br />
                  确定进行操作吗？
                </template>
                <a-button type="primary" status="danger">废弃</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
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
import pinyin from 'pinyin'

const ITEMS_PER_PAGE = 20

export default defineComponent({
  name: 'BatchHistoryPage',
  data () {
    return {
      searchText: '',
      paginationProps: false,
      batchesAndItems: []
    }
  },
  methods: {
    renderData () {
      this.batchesAndItems = this.$store.state.batchesAndItems.filter((item) => {
        const name = item.name.toLowerCase()
        const manufacturer = item.manufacturer.toLowerCase()
        const tmp = this.searchText.toLowerCase()

        function contains (str, p) {
          return pinyin(str, { style: 'first_letter' }).reduce((result, item) => result + item[0], '').includes(p)
        }

        return contains(name, tmp) || contains(manufacturer, tmp) || name.includes(tmp) || manufacturer.includes(tmp)
      })
      if (this.batchesAndItems.length <= ITEMS_PER_PAGE) {
        this.paginationProps = false
      } else {
        this.paginationProps = {
          total: this.batchesAndItems.length,
          defaultCurrent: 1,
          pageSize: ITEMS_PER_PAGE
        }
      }
    },
    refreshData () {
      ApiClient.getItems().then((res) => {
        this.$store.commit('setItems', res.data)
      }).catch(err => this.$message.error('拉取项目失败：' + err.message))
      ApiClient.getBatchesAndItems().then(res => {
        this.$store.commit('setBatchesAndItems', res.data)
        this.renderData()
      }).catch(err => this.$message.error('拉取批次历史失败：' + err.message))
    },
    disableBatch (batchId) {
      ApiClient.disableBatch(batchId).then(res => {
        this.$message.success('废弃批次成功')
        this.refreshData()
      }).catch(err => this.$message.error('废弃批次失败：' + err.message))
    },
    getColorStyle (item) {
      if (item.expiration === '2099-12-31') {
        return { color: 'white' }
      }
      const expiration = new Date(item.expiration)
      const today = new Date()
      const days = Math.abs((expiration - today) / (1000 * 3600 * 24))
      if (days <= 90 && item.disabled === 0) {
        return { color: 'white', backgroundColor: 'red' }
      } else {
        return {}
      }
    }
  },
  watch: {
    searchText () {
      this.renderData()
    },
    isBatchesAndItemsReady () {
      this.renderData()
    }
  },
  computed: {
    isBatchesAndItemsReady () {
      return this.$store.state.batchesAndItems !== null
    }
  },
  mounted () {
    if (this.isBatchesAndItemsReady) {
      this.renderData()
    }
  }
})
</script>
