<template>
  <div>
    <div v-if="isBatchesAndItemsReady">
      <a-table :style="{ margin: 'auto', width: '80%' }" :data="batchesAndItems" :columns="columns"
        :pagination="paginationProps">
        <template #operation="{ rowIndex }">
          <div v-if="batchesAndItems[rowIndex].disabled">
            <span :style="{ color: 'red' }">批次已废弃</span>
          </div>
          <a-popconfirm v-else @ok="disableBatch(batchesAndItems[rowIndex])">
            <template #content>
              废弃该批次将不再追踪该批次的保质期，
              <br />
              确定进行操作吗？
            </template>
            <a-button type="primary" status="danger">删除</a-button>
          </a-popconfirm>
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

const ITEMS_PER_PAGE = 20

export default defineComponent({
  name: 'BatchHistoryPage',
  data () {
    return {
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
          title: '保质期',
          dataIndex: 'expiration'
        },
        {
          title: '供货商',
          dataIndex: 'vendor'
        },
        {
          title: '操作',
          slotName: 'operation',
          fixed: 'right',
          width: 120
        }
      ],
      batchesAndItems: []
    }
  },
  methods: {
    renderData () {
      this.batchesAndItems = this.$store.state.batchesAndItems
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
    disableBatch (batch) {
      ApiClient.disableBatch(batch.id).then(res => {
        this.$message.success('废弃批次成功')
        this.refreshData()
      }).catch(err => this.$message.error('废弃批次失败：' + err.message))
    }
  },
  watch: {
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
