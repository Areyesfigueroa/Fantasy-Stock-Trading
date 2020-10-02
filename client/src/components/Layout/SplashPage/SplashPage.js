import React, { useState } from 'react';

import classes from './SplashPage.module.css';
import splashImg from '../../../assets/img/splashImg.jpg';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from '../../Modal/Modal';
import Nav from 'react-bootstrap/Nav';

//Forms
import LoginForm from '../../Forms/LoginForm/LoginForm';
import RegisterForm from '../../Forms/RegisterForm/RegisterForm';

const SplashPage = () => {

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
        <div className={classes.SplashPage}>
            <div className={classes.shadowBox}></div>
            <Image fluid src={splashImg} alt="Background"/>

            <div className={classes.content}>
                <h1>Fantasy Stock Trading</h1>
                <p>Sentence 1</p>
                <p>Sentence 2</p>
                <p>Sentence 3</p>

                <Button onClick={handleModalShow}>Login/Register</Button>
                <Modal 
                show={show} 
                close={handleModalClose} 
                bodyStyle={{padding: "0"}}
                footer={appendModalFooter()}>
                    <Nav variant="tabs" defaultActiveKey="login-form" onSelect={handleForm}>
                        <Nav.Item>
                            <Nav.Link eventKey="login-form">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="register-form">Register</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    { showLoginForm ? <LoginForm style={{padding: "16px"}}/> : null }
                    { showRegisterForm ? <RegisterForm style={{padding: "16px"}}/> : null }
                </Modal>

            </div>
        </div>
    );
};

export default SplashPage;