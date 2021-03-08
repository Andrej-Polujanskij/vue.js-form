<template>
  <div class="bg-grey-300 py-16">
    <div id="app" class=" max-w-lg mx-auto bg-white px-8">

      <div class="max-w-38 py-24 mx-auto">
        <form
            @submit.prevent="submit"
            :class="blur ? 'blur' : '' "
        >
          <div class="flex justify-between ">

            <inputRadioComponent
                title="$99 Plan"
                inputValue="99"
                id="price-1"
                :validationState="$v.price"
                v-model="price"
                ref="radio"
            />

            <inputRadioComponent
                title="$179 Plan"
                inputValue="179"
                id="price-2"
                :validationState="$v.price"
                v-model="price"
                ref="radio"
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
              v-model.trim="first_name"
              :value="first_name"
              :validationState="$v.first_name"
          />
          <inputErrorHandler
              :validationState="$v.first_name"
          />

          <inputComponent
              name="Last name"
              id="last_name"
              v-model.trim="last_name"
              :value="last_name"
              :validationState="$v.last_name"
          />
          <inputErrorHandler
              :validationState="$v.last_name"
          />

          <inputComponent
              name="Email address"
              id="email"
              v-model.trim="email"
              :value="email"
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
                  readonly
                  type="text"
                  id="card_name"
                  class="border rounded-4 text-16 p-11 w-full"
                  v-model.trim="Fullname"
                  :class=" $v.full_name.$error ? 'border-red-700' :  'border-grey-100' "
              >
            </div>
            <inputErrorHandler
                :validationState="$v.full_name"
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
                  v-cleave="{creditCard: true,  autoMask: true}"
              />
              <div class="absolute right-14 top-0 bottom-0 flex">
                <img src="@/assets/icons/card.svg" alt="card">
              </div>
            </div>
            <inputErrorHandler
                :validationState="$v.card_number"
            />


          </div>

          <div class="flex -mx-15">
            <div class="flex flex-col w-1/2 mx-15">
              <label for="expiry_date" class="text-15 leading-28 text-grey-500 mt-4 ml-4">
                Expiry Date
              </label>
              <div class="relative">
                <input type="text"
                       id="expiry_date"
                       class="border rounded-4 text-16 p-11 w-full"
                       :class=" $v.card_number.$error ? 'border-red-700' : 'border-grey-100' "
                       v-model.trim="expiry_date"
                       v-cleave="{date: true, datePattern: ['m', 'y']}"
                >
              </div>
              <inputErrorHandler
                  :validationState="$v.expiry_date"
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
                  <img src="@/assets/icons/question.svg" alt="card">
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
import inputComponent from './components/input-component.vue'
import inputErrorHandler from './components/input-error-handler.vue'
import inputRadioComponent from './components/input-radio-component.vue'
import Cleave from 'cleave.js';

import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'App',
  components: {
    inputComponent,
    inputErrorHandler,
    inputRadioComponent,
  },
  data() {
    return {
      full_name: '',
      price: null,
      first_name: '',
      last_name: '',
      email: '',
      checkbox: null,
      card_number: '',
      expiry_date: '',
      cvc: '',
      blur: false
    }
  },
  computed: {
    Fullname() {
      return this.full_name = this.first_name + ' ' + this.last_name
    },
  },
  methods: {
    submit() {

      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('error!')

      } else {
        this.blur = true

        setTimeout(() => {
          console.log('submit!')
          this.blur = false

          this.first_name = ''
          this.last_name = ''
          this.full_name = ''
          this.email = ''

          this.card_number = ''
          this.expiry_date = ''
          this.cvc = ''

          this.checkbox = null
          this.price = ''

          this.$v.$reset()

          let radioInputs = this.$refs.radio.$parent.$children
          for (let i = 0; i < radioInputs.length-1; i++) {
            if(i === 2){
              return false
            }
            radioInputs[i].$el.children[0].checked = false
          }


        }, 500)
      }
    },
  },
  validations: {
    price: {
      required
    },
    first_name: {
      required,
      minLength: minLength(2)
    },
    last_name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    full_name: {
      required,
    },
    card_number: {
      required,
    },
    checkbox: {
      required: value => value === true
    },
    expiry_date: {
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
        const event = new Event('input', {bubbles: true});
        setTimeout(function () {
          el.value = el.cleave.properties.result
          el.dispatchEvent(event)
        }, 100);
      }
    }
  }

}
</script>

<style lang="scss">
html {
  font-size: 10px;
}

input[type="radio"]:checked + span {
  background: #ECFDF5;
  border: 1px solid #6EE7B7;
}

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
