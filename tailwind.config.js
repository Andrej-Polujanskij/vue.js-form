module.exports = {
  theme: {
    extend: {
      width: {
        160: '16rem'
      },
      colors: {
        'orange-50': '#faebd7',
        'red-50': '#ffcfcf',
        'blue-100': '#EDF5FF',
        'blue-150': '#A3C8FF',
        'grey-100': '#D0D0D0',
        'grey-200': '#D1D5DB',
        'grey-300': '#E5E5E5',
        'green-200': '#ECFDF5',
        'green-300': '#6EE7B7',
        'green-350': '#21AB22',
        'green-400': '#22C023'
      },
      lineHeight: {
        19: '1.9rem',
        22: '2.2rem',
        28: '2.8rem'
      },
      spacing: {
        4: '0.4rem',
        7: '0.7rem',
        8: '0.8rem',
        11: '1.1rem',
        15: '1.5rem',
        18: '1.8rem',
        20: '2rem',
        50: '5rem'
      },
      inset: {
        14: '1.4rem'
      }
    },
    fontSize: {
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
      18: '1.8rem',
      22: '2.2rem',
      24: '2.4rem'
    },
    lineHeight: {
      18: '1.8rem'
    },
    borderRadius: {
      2: '0.2rem',
      4: '0.4rem',
      5: '0.5rem',
      7: '0.7rem'
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      lg: '1024px',
      38: '38rem'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
    // ...
  ],
  corePlugins: {
    outline: false
  }
}
