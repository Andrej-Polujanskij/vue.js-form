<template>
  <label
      :for="id"
      class="relative block cursor-pointer">
    <input
        type="radio"
        name="price"
        :id="id"
        class="absolute opacity-0 h-0 w-0"
        :value="value"
        @input="getInputValue"
    >
    <span
        class="text-24 font-bold block border rounded-5 py-10 px-12 transition duration-200 ease-in-out"
        :class="[ { 'bg-green-200 border-green-300': checkedState }, { 'border-grey-200': !checkedState } ]"
    >
              {{ title }}
            </span>
  </label>
</template>

<script>
export default {
  name: 'InputRadioComponent',
  data () {
    return {
      checkedState: null,
      updatePickedPrice: null
    }
  },
  props: {
    pickedPrice: {
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    validationState: {
      type: Object,
      required: true
    }
  },
  methods: {
    getInputValue (e) {
      this.$emit('input', e.target.value)
    }
  },
  watch: {
    pickedPrice: {
      handler(newPrice) {
        this.checkedState = false
        this.updatePickedPrice = parseFloat(newPrice)
        if(this.value === this.updatePickedPrice) {
          this.checkedState = !this.checkedState
        }
      },
      immediate: true
    }
  }
}
</script>
