import { useState } from 'react';

const useToast = () => {

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleShow = (title='', message='') => {
        setShow(true)
        if(message) setMessage(message);
        if(title) setTitle(title);
    };

    const handleClose = () => setShow(false);

    return {
        show,
        title,
        message,
        handleShow,
        handleClose
    }
};

export default useToast;