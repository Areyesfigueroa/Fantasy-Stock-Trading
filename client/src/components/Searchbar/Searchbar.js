import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import classes from './Searchbar.module.css';

const Searchbar = (props) => {
    const searchValueRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if(history.location.search) { 
            const params = new URLSearchParams(history.location.search);
            searchValueRef.current.defaultValue = params.get('q');
        }

        searchValueRef.current.addEventListener('keydown', searchOnEnter);

        return function cleanUpListener() {
            searchValueRef.current.removeEventListener('keydown', searchOnEnter);
        }
    }, []);

    const searchOnEnter = (event) => {
        if(event.keyCode === 13) {
            props.search(searchValueRef.current.value);
        }
    }

    return (
        <div className={classes.Searchbar}>
            <InputGroup className="mb-3">
                <FormControl
                ref={searchValueRef}
                placeholder="Search for your own stocks"
                aria-label="Search Stocks"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Button variant="outline-primary" onClick={() => props.search(searchValueRef.current.value)}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};

export default Searchbar;