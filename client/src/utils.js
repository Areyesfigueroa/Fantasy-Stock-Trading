const getFormElConfig = (id, value="") => {
    return {
        id: id,
        value: value,
        validation: {
            required: true
        },
        valid: false
    }
}

const checkValidity = (value, rules) => {
    let isValid = false;

    if(rules.required) {
        isValid = value.trim() !== '';
    }

    return isValid;
}


export { getFormElConfig, checkValidity };