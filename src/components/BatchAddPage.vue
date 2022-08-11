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
          <a-upload accept=".csv" :limit="1" action="/batches" :style="{ marginLeft: '50px' }" />
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

<script lang="ts">
import { defineComponent } from 'vue'
import BatchAddBox from './BatchAddBox.vue'

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
        sn: '',
        expirationTime: '',
        vendor: ''
      }
    }
  },
  methods: {
    downloadTemplate () {
      window.open('批次入库模板.csv')
    },
    addBatch () {
      console.log(this.newBatch)
    }
  },
  components: { BatchAddBox }
})
</script>
