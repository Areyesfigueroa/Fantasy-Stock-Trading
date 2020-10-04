import React, { useState } from 'react';
import SplashPage from '../../components/Layout/SplashPage/SplashPage';

const SplashPageContainer = () => {
    
    const [show, setShow] = useState(false);
    const [showLoginForm, setLoginForm] = useState(true);
    const [showRegisterForm, setRegisterForm] = useState(false);

    const FORM_NAV_KEYS = {
        login: "login-form",
        register: "register-form"
    };

    const handleModalClose = () => setShow(false);
    const handleModalShow = () => setShow(true);

    const handleForm = (eventKey) => {
        if(eventKey === FORM_NAV_KEYS.login) {
            setLoginForm(true);
            setRegisterForm(false);
        } else if (eventKey === FORM_NAV_KEYS.register) {
            setLoginForm(false);
            setRegisterForm(true);
        }
    }

    const appendModalFooter = () => {
        const style = {marginRight: "auto"};
        if(showLoginForm) {
            return (<p style={style}>Not a member? <a href="#LoginPage">Sign Up</a></p>);
        } else if(showRegisterForm) {
            return (<p style={style}>Already have an account? <a href="#LoginPage">Log In</a></p>);
        } else {
            return null;
        }
    }

    return (
        <SplashPage 
        showLoginForm={showLoginForm}
        showRegisterForm={showRegisterForm}
        handleForm={handleForm}
        showModal={show}
        handleModalShow={handleModalShow}
        handleModalClose={handleModalClose}
        modalFooter={appendModalFooter} />
    );
};

export default SplashPageContainer;