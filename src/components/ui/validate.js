/**
 * It takes in a dictionary of values and returns a dictionary of validators
 * @param values - The values object that is passed in from the form component.
 * @returns An object that contains all the validators.
 */
//input: values = {field: value, field2: value} ex { email: email@mail.com, phone: 666 666 6666 }
//output: {field: valid} ex {email: true, phone: true}
export default function validate(values) {
  const validators = {
    email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
    phone: value =>
      //check american phone number schema
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value) ||
      //check french phone number schema
      /^\(?([0-9]{2})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/.test(
        value
      ),
    name: value => value.length > 3,
    message: value => value.length > 3,
    password: value =>
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        value
      ),
    confirmation: value =>
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        value
      ),
    street: value =>
      /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/.test(
        value
      ),
    zip: value => /^\d{5}(-\d{4})?$/.test(value),
    promo: value => true,
  }
  const valid = {}

  Object.keys(values).map(field => {
    valid[field] = validators[field](values[field])
    return valid
  })
  return valid
}
