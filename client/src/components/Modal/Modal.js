import React from 'react';
import RBModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Modal = (props) => {
    const header = (
        <RBModal.Header closeButton style={props.headerStyle}>
            <RBModal.Title>{props.title}</RBModal.Title>
        </RBModal.Header>
    );
    return (
        <RBModal show={props.show} onHide={props.close}>
            {props.title ? header : null}

            <RBModal.Body style={props.bodyStyle}>
                {props.children}
            </RBModal.Body>

            <RBModal.Footer>
                {props.footer}
                <Button variant="secondary" onClick={props.close}>Close</Button>
            </RBModal.Footer>
        </RBModal>
    );
};

export default Modal;