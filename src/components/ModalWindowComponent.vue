<template>
  <div class="fixed z-50 top-0 left-0 w-full h-full bg-blue-50">
    <div class="modal-window-container w-1/2 max-w-6xl bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-8">
      <div class="mx-auto">
        <img
          src="@/assets/icons/green-check-icon.svg"
          alt=""
          class="mx-auto"
        >
        <div class="text-green-350 font-semibold text-22 text-center mt-8">
          Payment successful
        </div>
      </div>
      <div class="px-16 my-8 flex justify-between">
        <span class="text-18 text-gray-400">Customer name</span>
        <span class="text-18 text-black-900 font-bold">{{ paymentInfo.firstName }} {{ paymentInfo.lastName }}</span>
      </div>
      <div class="px-16 my-8 flex justify-between">
        <span class="text-18 text-gray-400">Email</span>
        <span class="text-18 text-black-900 font-bold">{{ paymentInfo.email }}</span>
      </div>
      <div class="px-16 my-8 flex justify-between">
        <span class="text-18 text-gray-400">Amount paid</span>
        <span class="text-18 text-black-900 font-bold">{{ paymentInfo.price }}$</span>
      </div>
      <div class="flex justify-center mt-6">
        <button
          type="button"
          class="text-white bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-18 uppercase px-12 py-4 rounded-4"
          @click="closeModal"
        >
          close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindowComponent',
  props: {
    paymentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.modal-window-container{
  transition: .3s ease-in-out;
}

</style>
