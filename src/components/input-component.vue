<template>
  <div class="flex flex-col">
    <label
        :for=id
        class="text-15 leading-28 text-grey-500 mt-4 ml-4">
      {{ name }}
    </label>
    <div class="relative">
      <input
          type="text"
          :id="id"
          class="border rounded-4 text-16 p-11 w-full"
          @input="getInputValue"
          :class="validationState.$error ? 'border-red-700' : 'border-grey-100'"
          :value="value"
          @keypress="isNumber($event)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-Component',
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
    isNumber (evt) {
      evt = (evt) || window.event
      if(this.id === 'firstName' || this.id === 'lastName') {
        const charCode = (evt.which) ? evt.which : evt.keyCode
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          return true
        } else {
          evt.preventDefault()
        }
      }
    }
  }
}
</script>
