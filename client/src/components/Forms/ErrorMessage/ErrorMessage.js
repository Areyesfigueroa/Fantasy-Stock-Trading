import React from 'react';

const ErrorMessage = (props) => {
    return (
        <small className="text-danger">{props.children}</small>
    );
};

export default ErrorMessage;