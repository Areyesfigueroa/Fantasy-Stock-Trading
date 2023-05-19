import React from 'react'
import classes from './Toast.module.css'
import BSToast from 'react-bootstrap/Toast'

const Toast = ({ show, close, title, children }) => {
  return (
    <div className={`${classes.Toast} ${show ? classes.fullWidth : ''}`}>
      <BSToast show={show} onClose={close}>
        <BSToast.Header>
          <strong className='mr-auto'>{title}</strong>
        </BSToast.Header>
        <BSToast.Body>{children}</BSToast.Body>
      </BSToast>
    </div>
  )
}

export default Toast
