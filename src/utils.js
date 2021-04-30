export const isNumber = (evt) => {
  evt = (evt) || window.event
  const charCode = (evt.which) ? evt.which : evt.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    return true
  } else {
    evt.preventDefault()
  }
}
