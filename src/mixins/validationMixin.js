export const validationMixin = {
    data() {
      return {
        emailRule: (v) => /.+@.+\..+/.test(v) || this.$t('validation.email'),
        phoneRule: (v) => /^[0-9]*$/.test(v) || this.$t('validation.phone'),
        requiredRule: (v) => !!v || this.$t('validation.required'),
      };
    },
  };