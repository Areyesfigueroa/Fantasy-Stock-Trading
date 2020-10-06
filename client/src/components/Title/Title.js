import React from 'react';
import classes from './Title.module.css';

const Title = (props) => {
    return (
        <div className={classes.Title}>
            <h1>{props.children}</h1>
            {props.subtitle ? <p>{props.subtitle}</p>: null}
        </div>
    );
};

export default Title;