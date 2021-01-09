const errors = {
  getError(error) {
     console.log(error.response)
    switch (error.response.status) {
      case 422:
        let errors = error.response.data.errors;
        // get only first error
        for (let i in errors) {
          return errors[i][0];
        }
        break
      case 401:
        return error.response.data.message;
        break
      case 400:{
        return error.response.data;
        break
      }
      case 405:{
        return error.response.data.message;
        break
      }
      default:
        return 'Unknown error'
        break;
    }
  },
}
export default errors

