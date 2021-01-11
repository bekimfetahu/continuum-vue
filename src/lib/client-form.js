export const clientForm = {
  data() {
    return {
      file: '',
      first_name: '',
      last_name: '',
      email: '',
      success: '',
      error: '',
      loading: false,
      submitting: false,
      disableFrontCheck: false
    }
  },
  methods: {
    getFormData: function () {

      let formData = new FormData();

      if (this.file) {  // when action update, this will be optional
        formData.append('avatar', this.file)
      }
      formData.append('first_name', this.first_name)
      formData.append('last_name', this.last_name)
      formData.append('email', this.email)
      if (this.action == "update") {
        formData.append('_method', 'PATCH');
      }
      return formData
    },
    validForm: function () {
      this.submitting = true
      if (this.first_name == '') {
        this.showError('First name is required!!')
        this.$refs.first_name.focus()
        return false
      }
      if (this.last_name == '') {
        this.showError('Last name is required!!')
        this.$refs.last_name.focus()
        return false
      }
      if (this.email == '') {
        this.showError('Email is required!!')
        this.$refs.email.focus()
        return false
      }
      if (!this.validEmail(this.email)) {
        this.showError('Enter valid email')
        this.$refs.email.focus()
        return false
      }
      if (this.action == "create" && this.file == '') {
        this.showError('Avatar is required!!')
        this.$refs.file.focus()
        return false
      }
      this.submitting = false
      return true;
    },
    validEmail: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    setFileUpload: function () {
      this.file = this.$refs.file.files[0];
    },
    showError(message) {
      this.error = message
      setTimeout(() => this.error = '', 15000)
    },
    showSuccess(message) {
      this.success = message
      setTimeout(() => this.success = '', 5000)
    },

  }
};
