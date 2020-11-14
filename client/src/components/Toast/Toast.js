import React from 'react';
import classes from './Toast.module.css';
import BSToast from 'react-bootstrap/Toast';

const Toast = (props) => {
    return (
    <div className={`${classes.Toast} ${props.show ? classes.fullWidth:''}`}>
          <BSToast show={props.show} onClose={props.close}>
            <BSToast.Header>
            <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
            />
            <strong className="mr-auto">{props.title ? props.title: "Oops! We ran into an issue"}</strong>
            {/* <small>11 mins ago</small> */}
            </BSToast.Header>
            <BSToast.Body>{props.children}</BSToast.Body>
        </BSToast>
    </div>
    );
};

export default Toast;