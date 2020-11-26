import React from 'react';
import classes from './ToastTransactionTitle.module.css';

const ToastTransactionTitle = () => {
    return (
        <div className={classes.ToastTransactionTitle}>
            <span>Transaction Completed</span>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
        </div>
    );
};

export default ToastTransactionTitle;