import { helpers } from 'vuelidate/lib/validators'

export const maxWordsLength = (param) => helpers.withParams(
  { type: 'maxWordsLength', max: param },
  (value) => value.split(' ').length <= param
)

const date = new Date()
const dateNow = new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const validExpiryDate = () => helpers.withParams(
  { type: 'validExpiryDate', min: dateNow },
  (value) => {
    const expDate = new Date(20 + value.split('/')[1], value.split('/')[0] - 1, date.getDate())
    return !(value !== '' && expDate <= dateNow)
  }
)
