<template>
  <div class="bg-grey-300 py-16">
    <transition name="modal-window">
      <ModalWindowComponent
        v-if="paymentDone"
        :payment-info="paymentInfo"
        @close="paymentDone = false"
      />
    </transition>
    <div
      id="app"
      class=" max-w-lg mx-auto bg-white px-8"
    >
      <div class="max-w-38 py-24 mx-auto">
        <form
          :class="{'blur': blur}"
          @submit.prevent="submit"
        >
          <div class="flex justify-between ">
            <InputRadioComponent
              v-for="item in dataPrice"
              :id="item.id"
              :key="item.id"
              :title="item.title"
              :value="item.price"
              :validation-state="$v.price"
              :picked-price="price"
              @input="setPrice"
            />
          </div>
          <InputErrorHandler
            :validation-state="$v.price"
          />
          <div class="font-bold text-18 mt-10">
            Customer Information
          </div>

          <InputComponent
            id="firstName"
            v-model.trim="firstName"
            name="First name"
            :validation-state="$v.firstName"
          />
          <InputErrorHandler
            :validation-state="$v.firstName"
          />

          <InputComponent
            id="lastName"
            v-model.trim="lastName"
            name="Last name"
            :validation-state="$v.lastName"
          />
          <InputErrorHandler
            :validation-state="$v.lastName"
          />

          <InputComponent
            id="email"
            v-model.trim="email"
            name="Email address"
            :validation-state="$v.email"
          />
          <InputErrorHandler
            :validation-state="$v.email"
          />

          <div class="font-bold text-18 mt-50">
            Billing Information
          </div>

          <div class="flex flex-col">
            <label
              for="card_name"
              class="text-15 leading-28 text-grey-500 mt-4 ml-4"
            >
              Card Holder Name
            </label>
            <div class="relative">
              <input
                id="card_name"
                v-model.trim="getFullName"
                type="text"
                class="border rounded-4 text-16 p-11 w-full"
                :class="$v.fullName.$error ? 'border-red-700' : 'border-grey-100'"
                @keypress="isNumber($event)"
              >
            </div>
            <InputErrorHandler
              :validation-state="$v.fullName"
            />
          </div>
          <div class="flex flex-col">
            <label
              for="cardNumber"
              class="text-15 leading-28 text-grey-500 mt-4 ml-4"
            >
              Card number
            </label>
            <div class="relative">
              <input
                id="cardNumber"
                v-model.number="cardNumber"
                v-cleave="{creditCard: true, creditCardStrictMode: true, onCreditCardTypeChanged : cardChanged}"
                type="text"
                name="cardNumber"
                class="border rounded-4 text-16 p-11 w-full "
                :class=" $v.cardNumber.$error ? 'border-red-700' : 'border-grey-100' "
              >
              <div class="absolute right-14 top-0 bottom-0 flex">
                <img
                  :src="imagePath"
                  alt="card"
                >
              </div>
            </div>
            <InputErrorHandler
              :validation-state="$v.cardNumber"
            />
          </div>

          <div class="flex -mx-15">
            <div class="flex flex-col w-1/2 mx-15">
              <label
                for="expiryDate"
                class="text-15 leading-28 text-grey-500 mt-4 ml-4"
              >
                Expiry Date
              </label>
              <div class="relative">
                <input
                  id="expiryDate"
                  v-model.trim="expiryDate"
                  v-cleave="{date: true, datePattern: ['m', 'y']}"
                  type="text"
                  class="border rounded-4 text-16 p-11 w-full"
                  :class=" $v.expiryDate.$error ? 'border-red-700' : 'border-grey-100' "
                >
              </div>
              <InputErrorHandler
                :validation-state="$v.expiryDate"
              />
            </div>
            <div class="flex flex-col w-1/2 mx-15">
              <label
                for="cvc"
                class="text-15 leading-28 text-grey-500 mt-4 ml-4"
              >
                CVV/CVC
              </label>
              <div class="relative">
                <input
                  id="cvc"
                  v-model.number="cvc"
                  v-cleave="{numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 6}"
                  type="text"
                  class="border rounded-4 text-16 p-11 w-full"
                  :class=" $v.cvc.$error ? 'border-red-700' : 'border-grey-100' "
                >
                <div class="absolute right-14 top-0 bottom-0 flex">
                  <img
                    src="@/assets/icons/question.svg"
                    alt="card"
                  >
                  <div
                    v-click-outside="closeEvent"
                    class="absolute cursor-pointer w-full h-full"
                    @click.self="tooltipHandler"
                  >
                    <TooltipComponent
                      :open-state="tooltipOpen"
                    >
                      <p>The <span class="font-bold">3 (or 4)</span> digits on the back of your credit card</p>
                      <img
                        class="pt-5"
                        src="@/assets/images/CVV.jpg"
                        alt=""
                      >
                    </TooltipComponent>
                  </div>
                </div>
              </div>
              <InputErrorHandler
                :validation-state="$v.cvc"
              />
            </div>
          </div>

          <div class="flex justify-between mt-6">
            <div class="font-bold text-22">
              Total
            </div>
            <div class="font-bold text-22">
              USD ${{ price }}
            </div>
          </div>

          <div class="text-14 leading-19 my-15">
            Immediate access to this product is available once payment is approved.
          </div>

          <div
            class="px-15 py-8 bg-blue-100 border  rounded-2 flex items-baseline"
            :class=" $v.checkbox.$error ? 'border-red-700' : 'border-blue-150' "
          >
            <div class="mr-15">
              <input
                v-model="checkbox"
                class="p-7 rounded-2"
                type="checkbox"
                :class=" $v.checkbox.$error ? 'border-red-700' : 'border-blue-150' "
              >
            </div>
            <div class="text-16 leading-22">
              Click the checkbox to agree to the
              <a
                class="font-semibold underline md:hover:no-underline"
                href="#"
              >
                Terms and Conditions
              </a>.
            </div>
          </div>

          <div class="mt-20">
            <button
              type="submit"
              class="rounded-7 text-white py-18 text-24 font-bold flex justify-center w-full items-center bg-gradient-to-r from-green-350 to-green-400"
            >
              BUY NOW
              <span class="flex ml-15">
                <img
                  src="@/assets/icons/arrow.svg"
                  alt=""
                >
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from './components/InputComponent.vue'
import InputErrorHandler from './components/InputErrorHandler.vue'
import InputRadioComponent from './components/InputRadioComponent.vue'
import TooltipComponent from './components/TooltipComponent.vue'
import ModalWindowComponent from './components/ModalWindowComponent.vue'
import Cleave from 'cleave.js'
import data from './data/plans.json'
import cards from '@/assets/icons'
import { required, minLength, email, helpers } from 'vuelidate/lib/validators'

const maxWordsLength = (param) => helpers.withParams(
  { type: 'maxWordsLength', max: param },
  (value) => value.split(' ').length <= param
)

export default {
  name: 'App',
  components: {
    InputComponent,
    InputErrorHandler,
    InputRadioComponent,
    TooltipComponent,
    ModalWindowComponent
  },
  data () {
    return {
      price: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      checkbox: null,
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      blur: false,
      dataPrice: [],
      cardHolderNameState: true,
      imagePath: '',
      tooltipOpen: false,
      paymentDone: false,
      paymentInfo: {}
    }
  },
  computed: {
    getFullName: {
      get () {
        return this.fullName
      },
      set (newValue) {
        this.fullName = newValue
        this.cardHolderNameState = false
      }
    }
  },
  watch: {
    expiryDate (string) {
      const expiryDateMonth = string.split('/')[0]
      const monthNow = (new Date().getMonth() + 1).toString().padStart(2, '0')
      if (expiryDateMonth < monthNow && expiryDateMonth.length > 1) {
        this.expiryDate = string.replaceAll(`${expiryDateMonth}/`, `${monthNow}/`)
      }

      const expiryDateYear = string.split('/')[1]
      const yearNow = new Date().getFullYear().toString().substr(-2)
      if (expiryDateYear !== undefined && expiryDateYear !== '') {
        if (expiryDateYear < yearNow && expiryDateYear.length > 1) {
          this.expiryDate = string.replaceAll(`/${expiryDateYear}`, `/${yearNow}`)
        }
      }
    },
    firstName (value) {
      if (this.cardHolderNameState === true) {
        this.fullName = value + ' ' + this.lastName
      }
    },
    lastName (value) {
      if (this.cardHolderNameState === true) {
        this.fullName = this.firstName + ' ' + value
      }
    }
  },
  mounted () {
    this.dataPrice = data
    this.imagePath = cards.defaultCard
    this.price = this.dataPrice.reduce((element, max) => element > max.price ? element : max.price, 0)
  },
  methods: {
    setPrice (price = null) {
      this.price = price
    },
    cardChanged (e) {
      this.imagePath = cards[`${e}Card`] || cards.defaultCard
    },
    tooltipHandler () {
      this.tooltipOpen = !this.tooltipOpen
    },
    closeEvent () {
      if (this.tooltipOpen === true) {
        this.tooltipOpen = false
      }
    },
    isNumber (evt) {
      evt = (evt) || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        return true
      } else {
        evt.preventDefault()
      }
    },

    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('error!')
      } else {
        this.blur = true
        console.log(this.price)
        setTimeout(() => {
          console.log('submit!')
          this.paymentDone = true
          this.paymentInfo.price = this.price
          this.blur = false

          this.firstName = ''
          this.lastName = ''
          this.fullName = ''
          this.email = ''

          this.cardNumber = ''
          this.expiryDate = ''
          this.cvc = ''

          this.checkbox = null
          this.price = ''

          this.$v.$reset()
        }, 500)
      }
    }
  },
  validations: {
    price: {
      required
    },
    firstName: {
      required,
      minLength: minLength(2)
    },
    lastName: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    fullName: {
      required,
      maxWordsLength: maxWordsLength(3)
    },
    cardNumber: {
      required
    },
    checkbox: {
      required: value => value === true
    },
    expiryDate: {
      required
    },
    cvc: {
      required,
      minLength: minLength(3)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  directives: {
    cleave: {
      inserted: (el, binding) => {
        el.cleave = new Cleave(el, binding.value || {})
      },
      update: (el) => {
        const event = new Event('input', { bubbles: true })
        setTimeout(function () {
          el.value = el.cleave.properties.result
          el.dispatchEvent(event)
        }, 100)
      }
    },
    clickOutside: {
      bind: function (el, binding) {
        const clickOutsideEvent = event => {
          if (!el.contains(event.target) && el !== event.target) {
            binding.value(event)
          }
        }
        el.__vueClickEventHandler__ = clickOutsideEvent
        document.body.addEventListener('click', clickOutsideEvent)
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.__vueClickEventHandler__)
      }
    }
  }

}
</script>

<style lang="scss">
html {
  font-size: 10px;
}

//input[type="radio"]:checked + span {
//  background: #ffef71;
//  border: 1px solid #6EE7B7;
//}

.blur {
  filter: blur(3px);
}

* {
  :focus {
    border-color: inherit !important;
    box-shadow: inherit !important;
  }
}
.modal-window-container{
  transition: .3s ease-in-out;
}
.modal-window-enter, .modal-window-leave-to{
  opacity: 0;
}
.modal-window-enter-active, .modal-window-leave-to {
  transition: all .5s ease-in-out;
  .modal-window-container{
    opacity: 0;
    transform: translate(-50%, -100%);
  }
}

</style>
