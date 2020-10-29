import React from 'react';
import classes from './LoginPage.module.css';
import RegisterFormContainer from '../../../containers/Forms/RegisterFormContainer';
import LoginFormContainer from '../../../containers/Forms/LoginFormContainer';
import Title from '../../Title/Title';

const LoginPage = (props) => {
    return (
        <div className={classes.LoginPage}>
            <Title>Login or Register</Title>

            <div className={classes.container}>
                <div className={classes.form}>
                    <h5>Register Form</h5>
                    <RegisterFormContainer disableLabels disableFormText btnText="Register" setUserSession={props.setUserSession}/>   
                </div>
                <div className={classes.form}>
                    <h5>Login Form</h5>
                    <LoginFormContainer disableLabels disableHelperText btnText="Login" setUserSession={props.setUserSession}/>  
                </div>
            </div>
        </div>
    );
};

export default LoginPage;