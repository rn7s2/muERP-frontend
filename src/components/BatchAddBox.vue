<template>
  <div>
    <a-form :model="newBatch" v-if="isInDialog">
      <a-form-item field="date" label="入库日期">
        <a-date-picker v-model="newBatch.date" />
      </a-form-item>
      <a-form-item field="name" label="名称">
        <a-input v-model="newBatch.name" disabled />
      </a-form-item>
      <a-form-item field="specification" label="规格">
        <a-input v-model="newBatch.specification" disabled />
      </a-form-item>
      <a-form-item field="unit" label="包装单位">
        <a-input v-model="newBatch.unit" disabled />
      </a-form-item>
      <a-form-item field="manufacturer" label="生产商">
        <a-input v-model="newBatch.manufacturer" disabled />
      </a-form-item>
      <a-form-item field="number" label="数量">
        <a-input-number v-model="newBatch.number" mode="button" :precision="0" />
      </a-form-item>
      <a-form-item field="price" label="单价">
        <a-input-number v-model="newBatch.price" :precision="2" disabled />
      </a-form-item>
      <a-form-item field="expiration" label="保质期至">
        <a-date-picker v-model="newBatch.expiration" />
      </a-form-item>
    </a-form>
    <a-form :model="newBatch" v-else>
      <a-form-item field="date" label="入库日期">
        <a-date-picker v-model="newBatch.date" />
      </a-form-item>
      <a-form-item field="name" label="名称">
        <a-input v-model="newBatch.name" />
      </a-form-item>
      <a-form-item field="specification" label="规格">
        <a-input v-model="newBatch.specification" />
      </a-form-item>
      <a-form-item field="unit" label="包装单位">
        <a-input v-model="newBatch.unit" />
      </a-form-item>
      <a-form-item field="manufacturer" label="生产商">
        <a-input v-model="newBatch.manufacturer" />
      </a-form-item>
      <a-form-item field="number" label="数量">
        <a-input-number v-model="newBatch.number" mode="button" :precision="0" />
      </a-form-item>
      <a-form-item field="price" label="单价">
        <a-input-number v-model="newBatch.price" :precision="2" />
      </a-form-item>
      <a-form-item field="expiration" label="保质期至">
        <a-date-picker v-model="newBatch.expiration" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BatchAddBox',
  props: ['batch', 'isInDialog'],
  data () {
    return {
      newBatch: this.batch
    }
  }
})
</script>
