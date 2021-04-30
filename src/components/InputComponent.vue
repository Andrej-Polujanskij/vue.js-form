<template>
  <div class="flex flex-col">
    <label
      :for="id"
      class="text-15 leading-28 text-grey-500 mt-4 ml-4"
    >
      {{ name }}
    </label>
    <div class="relative">
      <input
        :id="id"
        type="text"
        class="border rounded-4 text-16 p-11 w-full"
        :class=" validationState.$error ? 'border-red-700' : 'border-grey-100' "
        :value="value"
        @input="getInputValue"
        @keypress="keypress($event)"
      >
    </div>
  </div>
</template>

<script>
import { isNumber } from '@/utils.js'

export default {
  name: 'InputComponent',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    validationState: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    getInputValue (e) {
      this.$emit('input', e.target.value)
    },
    keypress (event) {
      isNumber(event)
    }
  }
}
</script>
