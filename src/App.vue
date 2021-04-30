<template>
  <div class="bg-grey-300 py-16">
    <transition name="modal-window">
      <ModalWindowComponent
        v-if="modalOpen"
        :payment-info="paymentInfo"
        @close="modalOpen = false"
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
              :validation-state="$v.form.price"
              :picked-price="form.price"
              @input="setPrice"
            />
          </div>
          <InputErrorHandler
            :validation-state="$v.form.price"
          />
          <div class="font-bold text-18 mt-10">
            Customer Information
          </div>

          <InputComponent
            id="firstName"
            v-model.trim="form.firstName"
            name="First name"
            :validation-state="$v.form.firstName"
          />
          <InputErrorHandler
            :validation-state="$v.form.firstName"
          />

          <InputComponent
            id="lastName"
            v-model.trim="form.lastName"
            name="Last name"
            :validation-state="$v.form.lastName"
          />
          <InputErrorHandler
            :validation-state="$v.form.lastName"
          />

          <InputComponent
            id="email"
            v-model.trim="form.email"
            name="Email address"
            :validation-state="$v.form.email"
          />
          <InputErrorHandler
            :validation-state="$v.form.email"
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
                :class="$v.form.fullName.$error ? 'border-red-700' : 'border-grey-100'"
                @keypress="keyPress($event)"
              >
            </div>
            <InputErrorHandler
              :validation-state="$v.form.fullName"
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
                v-model.number="form.cardNumber"
                v-cleave="{creditCard: true, creditCardStrictMode: true, onCreditCardTypeChanged : cardChanged}"
                type="text"
                name="cardNumber"
                class="border rounded-4 text-16 p-11 w-full "
                :class=" $v.form.cardNumber.$error ? 'border-red-700' : 'border-grey-100' "
              >
              <div class="absolute right-14 top-0 bottom-0 flex">
                <img
                  :src="imagePath"
                  alt="card"
                >
              </div>
            </div>
            <InputErrorHandler
              :validation-state="$v.form.cardNumber"
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
                  v-model.trim="form.expiryDate"
                  v-cleave="{date: true, datePattern: ['m', 'y']}"
                  type="text"
                  class="border rounded-4 text-16 p-11 w-full"
                  :class=" $v.form.expiryDate.$error ? 'border-red-700' : 'border-grey-100' "
                >
              </div>
              <InputErrorHandler
                :validation-state="$v.form.expiryDate"
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
                  v-model.number="form.cvc"
                  v-cleave="{numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 6}"
                  type="text"
                  class="border rounded-4 text-16 p-11 w-full"
                  :class=" $v.form.cvc.$error ? 'border-red-700' : 'border-grey-100' "
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
                :validation-state="$v.form.cvc"
              />
            </div>
          </div>

          <div class="flex justify-between mt-6">
            <div class="font-bold text-22">
              Total
            </div>
            <div class="font-bold text-22">
              USD ${{ form.price }}
            </div>
          </div>

          <div class="text-14 leading-19 my-15">
            Immediate access to this product is available once payment is approved.
          </div>

          <div
            class="px-15 py-8 bg-blue-100 border  rounded-2 flex items-baseline"
            :class=" $v.form.checkbox.$error ? 'border-red-700' : 'border-blue-150' "
          >
            <div class="mr-15">
              <input
                v-model="form.checkbox"
                class="p-7 rounded-2"
                type="checkbox"
                :class=" $v.form.checkbox.$error ? 'border-red-700' : 'border-blue-150' "
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
import { isNumber } from '@/utils.js'
import { maxWordsLength, validExpiryDate } from '@/validations.js'
import { required, minLength, email } from 'vuelidate/lib/validators'

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
      form: {
        price: '',
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        checkbox: null
      },
      blur: false,
      tooltipOpen: false,
      modalOpen: false,
      imagePath: '',
      cardHolderNameState: true,
      dataPrice: [],
      paymentInfo: {}
    }
  },
  computed: {
    getFullName: {
      get () {
        return this.form.fullName
      },
      set (newValue) {
        this.form.fullName = newValue
        this.cardHolderNameState = false
      }
    }
  },
  watch: {
    'form.firstName' (value) {
      if (this.cardHolderNameState === true) {
        this.form.fullName = value + ' ' + this.form.lastName
      }
    },
    'form.lastName' (value) {
      if (this.cardHolderNameState === true) {
        this.form.fullName = this.form.firstName + ' ' + value
      }
    }
  },
  mounted () {
    this.dataPrice = data
    this.imagePath = cards.defaultCard
    this.form.price = this.dataPrice.reduce((element, max) => element > max.price ? element : max.price, 0)
  },
  methods: {
    setPrice (price = null) {
      this.form.price = price
    },
    cardChanged (cardName) {
      this.imagePath = cards[`${cardName}Card`] || cards.defaultCard
    },
    tooltipHandler () {
      this.tooltipOpen = !this.tooltipOpen
    },
    closeEvent () {
      if (this.tooltipOpen === true) {
        this.tooltipOpen = false
      }
    },
    keyPress (event) {
      isNumber(event)
    },
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('error!')
        this.modalOpen = true
      } else {
        this.blur = true
        setTimeout(() => {
          console.log('submit!')
          this.modalOpen = true
          this.paymentInfo.firstName = this.form.firstName
          this.paymentInfo.lastName = this.form.lastName
          this.paymentInfo.email = this.form.email
          this.paymentInfo.price = this.form.price
          this.blur = false

          this.firstName = ''
          this.lastName = ''
          this.fullName = ''
          this.email = ''
          this.cardNumber = ''
          this.expiryDate = ''
          this.cvc = ''
          this.checkbox = null

          this.form.price = ''

          this.$v.$reset()
        }, 500)
      }
    }
  },
  validations: {
    form: {
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
      fullName: {
        required,
        maxWordsLength: maxWordsLength(3)
      },
      email: {
        required,
        email
      },
      cardNumber: {
        required
      },
      expiryDate: {
        required,
        validExpiryDate: validExpiryDate()
      },
      cvc: {
        required,
        minLength: minLength(3)
      },
      checkbox: {
        required: value => value === true
      }
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
