<template>
  <div class="">

    <div class="text-red-700 text-14 ml-4" v-if="validationState.$dirty && !validationState.required">Field is
      required
    </div>

    <div class="" v-if="validationState.$dirty && validationState.$params.minLength">
      <div class="text-red-700 text-14 ml-4" v-if="!validationState.minLength">Field must have at least
        {{ validationState.$params.minLength.min }} letters.
      </div>
    </div>

    <div class="" v-if="validationState.$dirty && validationState.$params.email">
      <div class="text-red-700 text-14 ml-4"
           v-if="validationState.$dirty && !validationState.email">
        Fill in a valid email
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Input-Error-Handler',
  props: {
    validationState: {
      type: Object,
      required: true
    }
  }
}
</script>
