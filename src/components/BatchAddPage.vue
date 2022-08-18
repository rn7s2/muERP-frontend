<template>
  <div :style="{ margin: 'auto', width: '50%' }">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="从表格导入">
        <a-space direction="vertical">
          <a-typography-paragraph :style="{ marginLeft: '50px' }">
            <a-typography-text :style="{ fontWeight: 'bold', fontSize: 'large' }">
              请下载如下表格，将数据粘入保存，然后上传。
            </a-typography-text>
          </a-typography-paragraph>
          <a-button type="primary" :style="{ marginLeft: '50px' }" @click="downloadTemplate()">
            <template #icon>
              <icon-arrow-down />
            </template>
            <template #default>批次入库模板.csv</template>
          </a-button>
          <a-upload accept=".csv" :limit="1" action="/api/batches-from-xlsx" :style="{ marginLeft: '50px' }" />
        </a-space>
      </a-tab-pane>
      <a-tab-pane key="2" title="手动添加批次">
        <a-typography-paragraph :style="{ marginLeft: '50px' }">
          <a-typography-text type="danger">
            <span :style="{ fontWeight: 'bold', fontSize: 'large' }">警告：</span>
          </a-typography-text>
          <a-typography-text>手动添加批次时，信息必须完全一致（空格、中英文标点等微小差异也算不一致），否则会添加一个新的货物种类，造成同一种货物对应多个项目的情况！ <br />
            上述情况会导致统计不全，库存数据混乱，所以<span :style="{ fontWeight: 'bold' }">不建议手动添加批次入库</span>。
            <br />
            <a-typography-text type="danger">
              <span :style="{ fontWeight: 'bold', fontSize: 'large' }">如需入库库中已存在货物，请从 库存概览 中 搜索 并进行 批次入库！</span>
            </a-typography-text>
          </a-typography-text>
        </a-typography-paragraph>
        <BatchAddBox :batch="newBatch" :isInDialog="false" />
        <a-button :style="{ float: 'right' }" type="primary" @click="addBatch()">批次入库</a-button>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BatchAddBox from './BatchAddBox.vue'
import ApiClient from '@/plugins/api-client'

export default defineComponent({
  name: 'BatchAddPage',
  data () {
    return {
      newBatch: {
        date: '',
        name: '',
        specification: '',
        unit: '',
        manufacturer: '',
        number: 0,
        price: 0.0,
        expiration: '',
        vendor: ''
      }
    }
  },
  methods: {
    downloadTemplate () {
      window.location = '批次入库模板.csv'
    },
    refreshData () {
      ApiClient.getItems().then((res) => {
        this.$store.commit('setItems', res.data)
      }).catch(err => this.$message.error('拉取项目失败：' + err.message))
      ApiClient.getBatchesAndItems().then(res => {
        this.$store.commit('setBatchesAndItems', res.data)
      }).catch(err => this.$message.error('拉取批次历史失败：' + err.message))
    },
    addBatch () {
      if (this.newBatch.date === undefined || this.newBatch.date === null || this.newBatch.date === '') {
        this.$message.warning('请输入入库日期！')
        return
      }
      if (this.newBatch.expiration === undefined || this.newBatch.expiration === null || this.newBatch.expiration === '') {
        this.$message.warning('请输入保质期！')
        return
      }
      const itemId = this.$store.state.items.reduce((result, item) => {
        if (item.name === this.newBatch.name && item.manufacturer === this.newBatch.manufacturer) {
          return item.id
        } else {
          return result
        }
      }, null)
      if (itemId !== null) {
        ApiClient.addBatch({
          id: 0,
          date: this.newBatch.date,
          number: this.newBatch.number,
          expiration: this.newBatch.expiration,
          vendor: this.newBatch.vendor,
          disabled: 0,
          item_id: itemId
        }).then(res => {
          this.$message.success('添加批次成功')
          this.refreshData()
        }).catch(err => this.$message.error('添加批次失败：' + err.message))
      } else {
        ApiClient.createItem({
          id: 0,
          name: this.newBatch.name,
          specification: this.newBatch.specification,
          unit: this.newBatch.unit,
          manufacturer: this.newBatch.manufacturer,
          number: 0,
          price: this.newBatch.price,
          expiration: this.newBatch.expiration
        }).then(res => {
          ApiClient.addBatch({
            id: 0,
            date: this.newBatch.date,
            number: this.newBatch.number,
            expiration: this.newBatch.expiration,
            vendor: this.newBatch.vendor,
            disabled: 0,
            item_id: res.data
          }).then(res => {
            this.$message.success('添加批次成功')
            this.refreshData()
          }).catch(err => this.$message.error('添加批次失败：' + err.message))
        }).catch(err => this.$message.error('新建条目失败：' + err.message))
      }
    }
  },
  components: { BatchAddBox }
})
</script>
