import React from 'react'

import classes from './SplashPage.module.css'
import splashImg from '../../../assets/img/splashImg.jpg'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from '../../Modal/Modal'
import Nav from 'react-bootstrap/Nav'

//Forms
import RegisterFormContainer from '../../../containers/Forms/RegisterFormContainer'
import LoginFormContainer from '../../../containers/Forms/LoginFormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal, showModal } from '../../../store'

const SplashPage = ({
  showLoginForm,
  showRegisterForm,
  handleForm,
  modalFooter
}) => {
  const dispatch = useDispatch()

  const { show } = useSelector((store) => store.modal)

  const handleCloseModal = () => dispatch(hideModal())
  const handleShowModal = () => dispatch(showModal())

  return (
    <div className={classes.SplashPage}>
      <div className={classes.shadowBox}></div>
      <Image fluid src={splashImg} alt='Background' />
      <div className={classes.content}>
        <h1>Fantasy Stock Trading</h1>
        <p>This web app utilizes IEX Cloud API to fetch stock information</p>
        <p>
          Search for stocks from any company and use fake money to buy or sell
          shares
        </p>
        <p>
          View your share holdings and account balance through visual charts
        </p>
        <Button onClick={handleShowModal}>Login/Register</Button>
        <Modal
          show={show}
          close={handleCloseModal}
          bodyStyle={{ padding: '0' }}
          footer={modalFooter()}
        >
          <Nav
            variant='tabs'
            defaultActiveKey='login-form'
            onSelect={handleForm}
          >
            <Nav.Item>
              <Nav.Link eventKey='login-form'>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='register-form'>Register</Nav.Link>
            </Nav.Item>
          </Nav>
          {showLoginForm && (
            <LoginFormContainer style={{ padding: '16px' }} btnText='Login' />
          )}
          {showRegisterForm && (
            <RegisterFormContainer
              style={{ padding: '16px' }}
              btnText='Register'
            />
          )}
        </Modal>
      </div>
    </div>
  )
}

export default SplashPage
