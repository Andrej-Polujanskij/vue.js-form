<template>
  <div v-if="validationState.$dirty">
    <div
      v-if="!validationState.required"
      class="text-red-700 text-14 ml-4"
    >
      Field is required
    </div>

    <div v-if="validationState.$params.minLength">
      <div
        v-if="!validationState.minLength"
        class="text-red-700 text-14 ml-4"
      >
        Field must have at least
        {{ validationState.$params.minLength.min }} letters.
      </div>
    </div>

    <div v-if="validationState.$params.email">
      <div
        v-if="!validationState.email"
        class="text-red-700 text-14 ml-4"
      >
        Fill in a valid email
      </div>
    </div>

    <div v-if="validationState.$params.maxWordsLength">
      <div
        v-if="!validationState.maxWordsLength"
        class="text-red-700 text-14 ml-4"
      >
        Max {{ validationState.$params.maxWordsLength.max }} words in full name
      </div>
    </div>

    <div v-if="validationState.$params.validExpiryDate">
      <div
        v-if="!validationState.validExpiryDate"
        class="text-red-700 text-14 ml-4"
      >
        Fill in a valid expiry date
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputErrorHandler',
  props: {
    validationState: {
      type: Object,
      required: true
    }
  }
}
</script>
