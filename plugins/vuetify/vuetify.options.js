import colors from 'vuetify/es5/util/colors'

export default {
  theme: {
    breakpoint: {},
    icons: {
      iconfont: 'mdi', // 'mdi' || 'md' || 'fa' || 'fa4'
    },
    lang: {},
    rtl: true,
    dark: false,
    light: true,
    themes: {
      dark: {
        primary: colors.teal.accent4,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
      light: {
        primary: colors.teal.accent4,
      },
    },
  },
}
