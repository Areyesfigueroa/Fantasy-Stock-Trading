import React, { useState, useEffect } from 'react';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import ErrorMessage from '../../components/Forms/ErrorMessage/ErrorMessage';
import { getFormElConfig, checkValidity } from '../../formValidation';
import { registerUser } from '../../http';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

const RegisterFormContainer = (props) => {

    const [registerForm, setRegisterForm] = useState(
        {
            email: getFormElConfig('email', 'aliel2@gmail.com', 'email'),
            fName: getFormElConfig('firstName', 'Aliel', 'text'),
            lName: getFormElConfig('lastName', 'Reyes', 'text'),
            password: getFormElConfig('password', '@R3y3s7457!', 'password'),
            retypePassword: getFormElConfig('retypePassword', '@R3y3s7457!', 'password'),
            registerCheck: getFormElConfig('registerCheck', true, 'checkbox')
        }
    );

    const [isFormValid, setIsFormValid] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');
    const [userSession, setUserSession] = useLocalStorage('userSession', null);

    let history = useHistory();

    useEffect(() => {
        if(!isFormValid) return;
        registerUser(registerForm.email.value, registerForm.fName.value, registerForm.lName.value, registerForm.password.value, registerForm.registerCheck.value)
        .then(res => {            
            //Get the user session in the response. save to local storage.
            setUserSession(res);

            //Redirect user to home page.
            // history.push('/home');
        })
        .catch(error => {
            setSubmitErrorMessage(error.message);
            console.log(error.message);
        })

    }, [isFormValid])

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
        let isSubmittionValid = true;

        for(let key in registerForm) {
            let {valid, error} = checkValidity(registerForm[key].value, registerForm[key].validation);
            form[key].valid = valid;
            form[key].error = error;

            isSubmittionValid = valid && isSubmittionValid;
        }
        
        if(!isSubmittionValid) return;
        
        setRegisterForm(form);
        setIsFormValid(isSubmittionValid);
    }

    return (
        <RegisterForm 
            style={props.style}
            disableLabels={props.disableLabels }
            disableFormText={props.disableFormText}
            btnText={props.btnText}
            formConfig={registerForm}
            submitErrorMessage={submitErrorMessage}
            submit={handleSubmit}
            change={handleChange}
            />
    );
};

export default RegisterFormContainer;