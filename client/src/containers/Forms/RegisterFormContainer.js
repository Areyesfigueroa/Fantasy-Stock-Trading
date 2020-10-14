import React, { useState } from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';

import { getFormElConfig, checkValidity } from '../../formValidation';
import { registerUser } from '../../http';

const RegisterFormContainer = (props) => {

    const [registerForm, setRegisterForm] = useState(
        {
            email: getFormElConfig('email', '', 'email'),
            fName: getFormElConfig('firstName', '', 'text'),
            lName: getFormElConfig('lastName', '', 'text'),
            password: getFormElConfig('password', '', 'password'),
            retypePassword: getFormElConfig('retypePassword', '', 'password'),
            registerCheck: getFormElConfig('registerCheck', false, 'checkbox')
        }
    );

    const handleChange = (event) => {
        let form = { ...registerForm }
        switch(event.target.id){
            case (form.email.id):
                form.email.value = event.target.value;
                break;
            case (form.fName.id):
                form.fName.value = event.target.value;
                break;
            case (form.lName.id):
                form.lName.value = event.target.value;
                break;
            case (form.password.id):
                form.password.value = event.target.value;
                break;
            case (form.retypePassword.id):
                form.retypePassword.value = event.target.value;
                form.retypePassword.validation.matchInput = registerForm.password.value;
                break;
            case (form.registerCheck.id): 
                form.registerCheck.value = event.target.value;
                break;
            default:
                throw new Error("Form ID not found");
        }

        setRegisterForm(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let form = { ...registerForm };
        let isFormValid = true;

        for(let key in registerForm) {
            let {valid, error} = checkValidity(registerForm[key].value, registerForm[key].validation);
            form[key].valid = valid;
            form[key].error = error;

            isFormValid = valid && isFormValid;
        }

        setRegisterForm(form);

        if(!isFormValid) return;

        registerUser(form.email.value, form.fName.value, form.lName.value, form.password.value, form.registerCheck.value)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <RegisterForm 
            style={props.style}
            disableLabels={props.disableLabels }
            disableFormText={props.disableFormText}
            btnText={props.btnText}
            formConfig={registerForm}
            submit={handleSubmit}
            change={handleChange} 
            />
    );
};

export default RegisterFormContainer;