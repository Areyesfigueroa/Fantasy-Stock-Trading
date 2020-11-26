import React from 'react';
import classes from './Toast.module.css';
import BSToast from 'react-bootstrap/Toast';

const Toast = (props) => {
    return (
    <div className={`${classes.Toast} ${props.show ? classes.fullWidth:''}`}>
          <BSToast show={props.show} onClose={props.close}>
            <BSToast.Header>
              <strong className="mr-auto">{props.title}</strong>
            </BSToast.Header>
            <BSToast.Body>{props.children}</BSToast.Body>
        </BSToast>
    </div>
    );
};

export default Toast;