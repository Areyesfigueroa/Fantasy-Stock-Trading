import React from 'react';

import classes from './SplashPage.module.css';
import splashImg from '../../../assets/img/splashImg.jpg';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from '../../Modal/Modal';
import Nav from 'react-bootstrap/Nav';

//Forms
import LoginForm from '../../Forms/LoginForm/LoginForm';
import RegisterFormContainer from '../../../containers/Forms/RegisterFormContainer';
import useModal from '../../../hooks/useModal';

//TODO: Create a separate container for this component.
const SplashPage = (props) => {
    const formModal = useModal();

    return (
        <div className={classes.SplashPage}>
            <div className={classes.shadowBox}></div>
            <Image fluid src={splashImg} alt="Background"/>

            <div className={classes.content}>
                <h1>Fantasy Stock Trading</h1>
                <p>Sentence 1</p>
                <p>Sentence 2</p>
                <p>Sentence 3</p>

                <Button onClick={formModal.handleShowModal}>Login/Register</Button>
                <Modal 
                show={formModal.show} 
                close={formModal.handleCloseModal} 
                bodyStyle={{padding: "0"}}
                footer={props.modalFooter()}>
                    <Nav variant="tabs" defaultActiveKey="login-form" onSelect={props.handleForm}>
                        <Nav.Item>
                            <Nav.Link eventKey="login-form">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="register-form">Register</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    { props.showLoginForm ? <LoginForm style={{padding: "16px"}}/> : null }
                    { props.showRegisterForm ? <RegisterFormContainer style={{padding: "16px"}} btnText={"Register"}/> : null }
                </Modal>

            </div>
        </div>
    );
};

export default SplashPage;