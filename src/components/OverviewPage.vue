<template>
  <div>
    <div :style="{ margin: 'auto', width: '50%' }">
      <a-form-item label="搜索">
        <a-input v-model="searchText" placeholder="搜索（支持拼音首字母）……" />
      </a-form-item>
    </div>
    <a-table :style="{ margin: 'auto', width: '80%' }" :columns="columns" :pagination="paginationProps">
      <template #operation="{ rowIndex }">
        <a-space>
          <a-button type="primary">详情</a-button>
          <a-button type="primary" status="warning">修改</a-button>
          <a-popconfirm content="确定删除该条目吗？" @ok="rowIndex">
            <a-button type="primary" status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
    <ItemDetailDialog />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ItemDetailDialog from '../components/ItemDetailDialog.vue'

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
          slotName: 'operation'
        }
      ],
      filteredItems: []
    }
  },
  watch: {
    searchText () {
      (this as any).$message.success(this.searchText)
    }
  },
  components: {
    ItemDetailDialog
  }
})
</script>
