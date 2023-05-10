import { checkValidity } from '../../formValidation'

// Reusable reducer logic for Auth Slices

export const updateInputsConfig = (state, action) => {
  // We are assuming payload is of type
  // { fieldName: string, options: { disableLabels?: boolean, disableHelperText?: boolean } }[]

  if (!action.payload.length) return state

  action.payload.forEach(({ fieldName, options }) => {
    if (!fieldName) {
      console.error('Missing Field Name for form configuration changes')
    }

    if (options?.disableLabels) state.fields[fieldName].label = ''
    if (options?.disableHelperText) state.fields[fieldName].helperText = ''
  })
}

export const validateForm = (state) => {
  // Update all fields validity
  Object.keys(state.fields).forEach((fieldName) => {
    let { valid, error } = checkValidity(
      state.fields[fieldName].value,
      state.fields[fieldName].validation
    )
    state.fields[fieldName].valid = valid
    state.fields[fieldName].error = error
  })

  // Update form validity
  state.valid = Object.keys(state.fields).every(
    (key) => state.fields[key].valid
  )

  // Update form validity
  const invalidField = Object.keys(state.fields).find(
    (key) => !state.fields[key].valid
  )

  if (invalidField !== -1) {
    state.errorMessage = invalidField.error
  } else if (state.errorMessage) {
    state.errorMessage = ''
  }

  state.valid = true
}

export const updateFormField = (state, action) => {
  // Update value
  const { fieldName, fieldValue } = action.payload
  state.fields[fieldName].value = fieldValue

  // Update field validity
  let { valid, error } = checkValidity(
    state.fields[fieldName].value,
    state.fields[fieldName].validation
  )
  state.fields[fieldName].valid = valid
  state.fields[fieldName].error = error

  // Update form validity
  state.valid = Object.keys(state.fields).every(
    (key) => state.fields[key].valid
  )
}
