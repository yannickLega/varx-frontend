export default function validate(values) {
  //input: values = {field: value, field2: value} ex { email: email@mail.com, phone: 666 666 6666 }
  //output: {field: valid} ex {email: true, phone: true}
  const validators = {
    email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
    phone: value =>
      //check validité numéro américain
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value) ||
      //check validité numéro francais
      /^\(?([0-9]{2})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/.test(
        value
      ),
    name: value => value.length > 3,
    message: value => value.length > 3,
  }
  const valid = {}

  Object.keys(values).map(field => {
    valid[field] = validators[field](values[field])
  })
  return valid
}
