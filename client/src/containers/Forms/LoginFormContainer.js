import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router';
import { getFormElConfig, checkValidity } from '../../formValidation';
import useLocalStorage from '../../hooks/useLocalStorage';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { loginUser } from '../../http';

const LoginFormContainer = (props) => {
    const history = useHistory();

    const [loginForm, setLoginForm] = useState({
        email: getFormElConfig(
            'email',
            'login-email', 
            'email',
            props.disableLabels ? '':'Email Address', 
            'Enter Email', 
            props.disableHelperText ? '':"We'll never share your email with anyone else.",
            "aliel2@gmail.com"),
        
        password: getFormElConfig(
            'password',
            'login-password', 
            'password',
            props.disableLabels ? '':'Password', 
            'Enter Password',
            "",
            "@R3y3s7457!")
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [submitErrorMessage, setSubmitErrorMessage] = useState('');
    const [userSession, setUserSession] = useLocalStorage('userSession', null);


    useEffect(() => {
        if(!isFormValid) return;
        console.log("Login");
        loginUser(loginForm.email.value, loginForm.password.value)
        .then(res => {
            console.log("success");
            setUserSession(res);
            history.push("/trade");
        })
        .catch(error => {
            setSubmitErrorMessage(error.message);
            setIsFormValid(false);
            console.log(error.message);
        });
    }, [isFormValid]);

    const handleChange = (event) => {
        let form = {...loginForm};
        form[event.target.name].value = event.target.value;

        setLoginForm(form);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let form = { ...loginForm };
        let isSubmittionValid = true;

        for(let key in loginForm) {
            let {valid, error} = checkValidity(loginForm[key].value, loginForm[key].validation);
            form[key].valid = valid;
            form[key].error = error;

            isSubmittionValid = valid && isSubmittionValid;
        }
        setLoginForm(form);
        setIsFormValid(isSubmittionValid);
    }

    return (
        <div>
            <LoginForm 
                style={props.style}
                disableLabels={props.disableLabels}
                disableFormText={props.disableFormText}
                btnText={props.btnText}
                formConfig={loginForm}
                submitErrorMessage={submitErrorMessage}
                submit={handleSubmit}
                change={handleChange}
            />
        </div>
    );
};

export default LoginFormContainer;