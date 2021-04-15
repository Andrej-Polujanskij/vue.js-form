<template>
  <div class="" v-if="validationState.$dirty">

    <div class="text-red-700 text-14 ml-4" v-if="!validationState.required">Field is
      required
    </div>

    <div class="" v-if="validationState.$params.minLength">
      <div class="text-red-700 text-14 ml-4" v-if="!validationState.minLength">Field must have at least
        {{ validationState.$params.minLength.min }} letters.
      </div>
    </div>

    <div class="" v-if="validationState.$params.email">
      <div class="text-red-700 text-14 ml-4"
           v-if="!validationState.email">
        Fill in a valid email
      </div>
    </div>

    <div class="" v-if="validationState.$params.maxWordsLength">
      <div class="text-red-700 text-14 ml-4"
           v-if="!validationState.maxWordsLength">
        Max {{validationState.$params.maxWordsLength.max}} words in full name
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-Error-Handler',
  props: {
    validationState: {
      type: Object,
      required: true
    }
  }
}
</script>
