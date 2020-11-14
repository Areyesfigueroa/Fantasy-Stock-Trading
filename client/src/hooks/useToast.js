import { useState } from 'react';

const useToast = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const handleShow = (message) => {
        setShow(true)
        if(message) setMessage(message);
    };

    const handleClose = () => setShow(false);

    return {
        show,
        message,
        handleShow,
        handleClose,
    }
};

export default useToast;