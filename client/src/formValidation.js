const validationRules = {
  email: { required: true, textOnly: false, minLength: 3, maxLength: 320 },
  text: { required: true, textOnly: true, minLength: 1, maxLength: 35 },
  password: {
    required: true,
    textOnly: false,
    minLength: 8,
    maxLength: 128,
    specialChar: true
  },
  checkbox: { check: true }
}

const hasSpecialCharacters = (stringValue) => {
  return /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(stringValue)
}
const hasNumber = (stringValue) => {
  return /\d/.test(stringValue)
}

const getFormElConfig = (
  type,
  id,
  name,
  label = '',
  placeholder = '',
  helperText = '',
  value = ''
) => {
  return {
    type: type,
    id: id,
    name: name,
    label: label,
    placeholder: placeholder,
    helperText: helperText,
    value: value,
    validation: type ? validationRules[type] : {},
    valid: false,
    error: ''
  }
}

const checkValidity = (value, rules) => {
  let isValid = true
  let errorMsg = ''

  if (rules.required) {
    isValid = value.trim() !== '' && isValid
    errorMsg = !errorMsg && !isValid ? 'Cannot be empty' : errorMsg
  }
  if (rules.textOnly) {
    isValid = !hasNumber(value) && isValid
    errorMsg = !errorMsg && !isValid ? 'Only Text is allowed' : errorMsg
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
    errorMsg =
      !errorMsg && !isValid
        ? `Must be more than ${rules.minLength} characters`
        : errorMsg
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
    errorMsg =
      !errorMsg && !isValid
        ? `Must be less than ${rules.maxLength} characters`
        : errorMsg
  }
  if (rules.specialChar) {
    isValid = hasSpecialCharacters(value) && isValid
    errorMsg =
      !errorMsg && !isValid
        ? `Must have at least one special character (!@#$%&*^)`
        : errorMsg
  }
  if (rules.matchInput) {
    isValid = value === rules.matchInput && isValid
    errorMsg = !errorMsg && !isValid ? `Does not match` : errorMsg
  }
  if (rules.check) {
    isValid = value && isValid
    errorMsg = !errorMsg && !isValid ? 'Must agree with terms' : errorMsg
  }

  return {
    valid: isValid,
    error: errorMsg
  }
}
