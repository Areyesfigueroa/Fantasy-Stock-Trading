import React from 'react';

const ErrorMessage = (message) => {
    return (
        <small className="text-danger">{props.message}</small>
    );
};

export default ErrorMessage;