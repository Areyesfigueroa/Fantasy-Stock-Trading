import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import classes from './Searchbar.module.css';

const Searchbar = (props) => {
    return (
        <div className={classes.Searchbar}>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Search for your own stocks"
                aria-label="Search Stocks"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Button variant="outline-primary">Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};

export default Searchbar;