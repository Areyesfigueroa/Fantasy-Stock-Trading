import React from 'react';

import classes from './SplashPage.module.css';
import splashImg from '../../../assets/img/splashImg.jpg';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from '../../Modal/Modal';
import Nav from 'react-bootstrap/Nav';

//Forms
import RegisterFormContainer from '../../../containers/Forms/RegisterFormContainer';
import LoginFormContainer from '../../../containers/Forms/LoginFormContainer';
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
                <p>This web app utilizes IEX Cloud API to fetch stock information</p>
                <p>Search for stocks from any company and use fake money to buy or sell shares</p>
                <p>View your share holdings and account balance through visual charts</p>

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
                    { props.showLoginForm ? <LoginFormContainer style={{padding: "16px"}} btnText={"Login"} /> : null }
                    { props.showRegisterForm ? <RegisterFormContainer style={{padding: "16px"}} btnText={"Register"} /> : null }
                </Modal>

            </div>
        </div>
    );
};

export default SplashPage;