<template>
  <a-modal width="600px" :visible="visible" :draggable="true" ok-text="修改" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      详情 / 修改 {{ currentItem.name }}
    </template>
    <div>
      <a-form :model="currentItem">
        <a-form-item field="id" label="序号">
          <a-input-number v-model="currentItem.id" disabled />
        </a-form-item>
        <a-form-item field="name" label="名称">
          <a-input v-model="currentItem.name" />
        </a-form-item>
        <a-form-item field="specification" label="规格">
          <a-input v-model="currentItem.specification" />
        </a-form-item>
        <a-form-item field="unit" label="包装单位">
          <a-input v-model="currentItem.unit" />
        </a-form-item>
        <a-form-item field="manufacturer" label="生产商">
          <a-input v-model="currentItem.manufacturer" />
        </a-form-item>
        <a-form-item field="number" label="库存数量">
          <a-input-number v-model="currentItem.number" mode="button" :precision="0" />
        </a-form-item>
        <a-form-item field="price" label="单价">
          <a-input-number v-model="currentItem.price" :precision="2" />
        </a-form-item>
        <a-form-item field="expirationTime" label="最后一批保质期">
          <a-input v-model="currentItem.expirationTime" disabled />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemDetailDialog',
  props: ['visible', 'item'],
  data () {
    return {
      currentItem: { ...this.item }
    }
  },
  methods: {
    handleOk () {
      // modify item
      this.$parent.closeItemDetailDialog()
    },
    handleCancel () {
      this.$parent.closeItemDetailDialog()
    }
  }
})
</script>
