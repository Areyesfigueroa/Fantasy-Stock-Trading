import React, { useState, useEffect, useContext } from 'react';
import UserSessionContext from '../../context/UserSessionContext';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import { getFormElConfig, checkValidity } from '../../formValidation';
import { registerUser } from '../../http';
import { useHistory } from 'react-router-dom';

const RegisterFormContainer = (props) => {
    const history = useHistory();
    const userSession = useContext(UserSessionContext());
    const [registerForm, setRegisterForm] = useState(
        {
            email: getFormElConfig(
                'email',
                'register-email',
                'email',
                props.disableLabels ? '':'Email Address',
                'Enter Email',
                props.disableHelperText ? '':"We'll never share your email with anyone else."),
            fName: getFormElConfig(
                'text',
                'first-name',
                'fName',
                props.disableLabels ? '':'First Name', 
                'Enter First Name'), 
            lName: getFormElConfig(
                'text', 
                'last-name', 
                'lName',
                props.disableLabels ? '':'Last Name',
                'Enter Last Name'),
            password: getFormElConfig(
                'password', 
                'register-password', 
                'password',
                props.disableLabels ? '':'Password',
                'Enter Password'),
            retypePassword: getFormElConfig(
                'password', 
                'retype-password',
                'retypePassword', 
                props.disableLabels ? '':'Retype Password',
                'Retype Password'),
            registerCheck: getFormElConfig(
                'checkbox', 
                'register-check', 
                'registerCheck',
                'By checking you agree to our terms and policies',
                '',
                '',
                false)
        }
    );

    const [isFormValid, setIsFormValid] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');

    useEffect(() => {
        if(!isFormValid) return;
        
        registerUser(registerForm.email.value, registerForm.fName.value, registerForm.lName.value, registerForm.password.value, registerForm.registerCheck.value)
        .then(res => {            
            userSession.setSession(res); //Get the user session in the response. save to local storage.
            history.go(); //Reroute page.
        })
        .catch(error => {
            setSubmitErrorMessage(error.message);
            setIsFormValid(false);
            console.log(error.message);
        })

    }, [isFormValid]);

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
        setRegisterForm(form);
        setIsFormValid(isSubmittionValid);
    }

    return (
        <RegisterForm 
            style={props.style}
            disableLabels={props.disableLabels}
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