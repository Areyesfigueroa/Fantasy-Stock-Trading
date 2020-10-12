import React, { useState } from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';

import { getFormElConfig, checkValidity } from '../../utils';

const RegisterFormContainer = (props) => {
    const [registerForm, setRegisterForm] = useState(
        {
            email: getFormElConfig('email'),
            fName: getFormElConfig('firstName'),
            lName: getFormElConfig('lastName'),
            password: getFormElConfig('password'),
            retypePassword: getFormElConfig('retypePassword'),
            registerCheck: getFormElConfig('registerCheck')
        }
    )

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
                break;
        }

        setRegisterForm(form);
    }
    /**
     * Make sure the required values are not empty
     * confirm that the email is an email
     * first and last name need to be text
     * password needs to be the following:
     *  - minimum 8 characters long
     *  - uses one special character
     * retype password needs to match exactly to password.
     */

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(registerForm);
        // registerUser()
        // .then(res => {
        //     alert(res);
        // })
        // .catch(error => {
        //     alert(error);
        // })
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