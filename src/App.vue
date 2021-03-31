<template>
  <div class="bg-grey-300 py-16">
    <div id="app" class=" max-w-lg mx-auto bg-white px-8">

      <div class="max-w-38 py-24 mx-auto">
        <form
            @submit.prevent="submit"
            :class="{'blur': blur}"
        >
          <div class="flex justify-between ">

            <inputRadioComponent
                v-for="item in dataPrice"
                :key="item.id"
                :title="item.title"
                :value="item.price"
                :id="item.id"
                :validation-state="$v.price"
                @input="setPrice"
                :picked-price="price"
            />

          </div>
          <inputErrorHandler
              :validationState="$v.price"
          />

          <div class="font-bold text-18 mt-10">
            Customer Information
          </div>

          <inputComponent
              name="First name"
              id="first_name"
              v-model.trim="firstName"
              :validationState="$v.firstName"
          />
          <inputErrorHandler
              :validationState="$v.firstName"
          />

          <inputComponent
              name="Last name"
              id="lastName"
              v-model.trim="lastName"
              :validationState="$v.lastName"
          />
          <inputErrorHandler
              :validationState="$v.lastName"
          />

          <inputComponent
              name="Email address"
              id="email"
              v-model.trim="email"
              :validationState="$v.email"
          />
          <inputErrorHandler
              :validationState="$v.email"
          />

          <div class="font-bold text-18 mt-50">
            Billing Information
          </div>

          <div class="flex flex-col">
            <label for="card_name" class="text-15 leading-28 text-grey-500 mt-4 ml-4">
              Card Holder Name
            </label>
            <div class="relative">
              <input
                  type="text"
                  id="card_name"
                  class="border rounded-4 text-16 p-11 w-full"
                  v-model="Fullname"
                  :class=" $v.fullName.$error ? 'border-red-700' :  'border-grey-100' "
              >
            </div>
            <inputErrorHandler
                :validationState="$v.fullName"
            />
          </div>
          <div class="flex flex-col">
            <label for="card_number" class="text-15 leading-28 text-grey-500 mt-4 ml-4">
              Card number
            </label>
            <div class="relative">
              <input
                  type="text"
                  name="card_number"
                  id="card_number"
                  class="border rounded-4 text-16 p-11 w-full "
                  :class=" $v.card_number.$error ? 'border-red-700' : 'border-grey-100' "
                  v-model="card_number"
                  v-cleave="{creditCard: true,  autoMask: true, onCreditCardTypeChanged : cardChanged}"
              />
              <div class="absolute right-14 top-0 bottom-0 flex">
                <img :src="imagePath" alt="card">
              </div>
            </div>
            <inputErrorHandler
                :validationState="$v.card_number"
            />

          </div>

          <div class="flex -mx-15">
            <div class="flex flex-col w-1/2 mx-15">
              <label for="expiryDate" class="text-15 leading-28 text-grey-500 mt-4 ml-4">
                Expiry Date
              </label>
              <div class="relative">
                <input type="text"
                       id="expiryDate"
                       class="border rounded-4 text-16 p-11 w-full"
                       :class=" $v.expiryDate.$error ? 'border-red-700' : 'border-grey-100' "
                       v-model.trim="expiryDate"
                       v-cleave="{date: true, datePattern: ['m', 'y']}"
                >
              </div>
              <inputErrorHandler
                  :validationState="$v.expiryDate"
              />
            </div>
            <div class="flex flex-col w-1/2 mx-15">
              <label for="cvc" class="text-15 leading-28 text-grey-500 mt-4 ml-4">
                CVV/CVC
              </label>
              <div class="relative">
                <input type="text"
                       id="cvc"
                       class="border rounded-4 text-16 p-11 w-full"
                       :class=" $v.cvc.$error ? 'border-red-700' : 'border-grey-100' "
                       v-model.trim="cvc"
                       v-cleave="{numeral: true, numeralPositiveOnly: true, numeralIntegerScale: 6}"
                >
                <div class="absolute right-14 top-0 bottom-0 flex">
                  <img
                      src="@/assets/icons/question.svg"
                      alt="card"
                  >
                <div
                    class="absolute cursor-pointer w-full h-full"
                     @click="tooltipHandler"
                     v-clickOutside="closeEvent">
                  <TooltipComponent
                    :openState="tooltipOpen"
                  >
                    <p>The <span class="font-bold">3 (or 4)</span> digits on the back of your credit card</p>
                    <img class="pt-5" src="@/assets/images/CVV.jpg" alt="">
                  </TooltipComponent>
                </div>

                </div>
              </div>
              <inputErrorHandler
                  :validationState="$v.cvc"
              />
            </div>
          </div>

          <div class="flex justify-between mt-6">
            <div class="font-bold text-22">Total</div>
            <div class="font-bold text-22">USD ${{ price }}</div>
          </div>

          <div class="text-14 leading-19 my-15">
            Immediate access to this product is available once payment is approved.
          </div>

          <div
              class="px-15 py-8 bg-blue-100 border  rounded-2 flex items-baseline"
              :class=" $v.checkbox.$error ? 'border-red-700' :  'border-blue-150' "
          >
            <div class="mr-15">
              <input
                  class="p-7 rounded-2"
                  type="checkbox"
                  v-model="checkbox"
                  :class=" $v.checkbox.$error ? 'border-red-700' :  'border-blue-150' "
              >
            </div>
            <div class="text-16 leading-22">
              Click the checkbox to agree to the
              <a class="font-semibold underline md:hover:no-underline" href="#">
                Terms and Conditions
              </a>.
            </div>
          </div>

          <div class="mt-20">
            <button
                type="submit"
                class="rounded-7 text-white py-18 text-24 font-bold flex justify-center w-full  items-center bg-gradient-to-r from-green-350 to-green-400"
            >
              BUY NOW
              <span class="flex ml-15">
                <img src="@/assets/icons/arrow.svg" alt="">
              </span>
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from './components/input-component.vue'
import InputErrorHandler from './components/input-error-handler.vue'
import InputRadioComponent from './components/input-radio-component.vue'
import TooltipComponent from './components/tooltip-component.vue'
import Cleave from 'cleave.js'
import data from './data/plans.json'
import cards from '@/assets/icons'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'App',
  components: {
    InputComponent,
    InputErrorHandler,
    InputRadioComponent,
    TooltipComponent
  },
  data () {
    return {
      price: '',
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      checkbox: null,
      card_number: '',
      expiryDate: '',
      cvc: '',
      blur: false,
      dataPrice: [],
      cardHolderNameState: true,
      imagePath: '',
      tooltipOpen: false,
      picked: false
    }
  },
  computed: {
    Fullname: {
      get () {
        if (this.cardHolderNameState === true) {
          return this.firstName + ' ' + this.lastName
        }
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
      const expiryDateYear = string.split('/')[1]
      const yearNow = new Date().getFullYear().toString().substr(-2)

      if (expiryDateYear !== undefined && expiryDateYear !== '') {
        if (expiryDateYear < yearNow && expiryDateYear.length > 1) {
          this.expiryDate = string.replaceAll(`/${expiryDateYear}`, `/${yearNow}`)
        }
      }
    }
  },
  mounted () {
    this.dataPrice = data
    this.imagePath = cards.defaultCard
  },
  methods: {
    setPrice (price = null) {
      this.price = price
    },
    cardChanged (e) {
      this.imagePath = cards.defaultCard
      switch (e) {
        case 'amex':
          this.imagePath = cards.amexCard
          break
        case 'visa':
          this.imagePath = cards.visaCard
          break
        case 'diners':
          this.imagePath = cards.dinnersCard
          break
        case 'mastercard':
          this.imagePath = cards.masterCard
          break
        case 'jcb':
          this.imagePath = cards.jsbCard
          break
        case 'discover':
          this.imagePath = cards.discoverCard
          break
      }
    },
    tooltipHandler () {
      this.tooltipOpen = !this.tooltipOpen
    },
    closeEvent () {
      if (this.tooltipOpen === true) {
        this.tooltipOpen = false
      }
    },

    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('error!')
      }else {
        this.blur = true

        setTimeout(() => {
          console.log('submit!')
          this.blur = false
          this.picked = false

          this.firstName = ''
          this.lastName = ''
          this.fullName = ''
          this.email = ''

          this.card_number = ''
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
      required
    },
    card_number: {
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
//  background: #ECFDF5;
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

</style>
