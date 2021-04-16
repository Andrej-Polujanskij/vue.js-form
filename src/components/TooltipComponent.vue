<template>
  <div
      v-if="openState"
      class="absolute p-5 w-160 bg-orange-50 bottom-full right-0 text-16 leading-18 cursor-auto">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TooltipComponent',
  props: {
    openState: {
      type: Boolean,
      required: true
    }
  }
}
</script>
