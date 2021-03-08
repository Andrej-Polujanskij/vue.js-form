<template>
  <label
      :for="id"
      class="relative block cursor-pointer">
    <input
        type="radio"
        name="price-1"
        :id="id"
        class="absolute opacity-0 h-0 w-0"
        :value="inputValue"
        @input="getInputValue"
    >
    <span
        class="text-24 font-bold block border rounded-5 py-10 px-12 transition duration-200 ease-in-out"
        :class="(validationState.$dirty && !validationState.required ) ? 'border-red-700 bg-red-50' :  'border-grey-200' "
    >
              {{ title }}
            </span>
  </label>
</template>

<script>
export default {
  name: 'Input-radio-component',
  props: {
    title: {
      type: String,
      required: true
    },
    inputValue: {
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
  methods: {
    getInputValue(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
